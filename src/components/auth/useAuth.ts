import { getFriendList, signInUser as signInApi } from "@/services/apiAuth";
import { signUpUser as signUpApi } from "@/services/apiAuth";
import { logout as logoutApi } from "@/services/apiAuth";
import { sendFriendRequest as sendFriendRequestApi } from "@/services/apiAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SignInResponse {
  access_token: string;
  payload: {
    username: string;
  };
}

interface SignInError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface UserData {
  username: string;
  password: string;
}

export function useSignInUser() {
  const navigate = useNavigate();

  const { mutate: handleSignIn, isPending } = useMutation<
    SignInResponse,
    SignInError,
    { username: string; password: string }
  >({
    mutationFn: ({ username, password }) => signInApi({ username, password }),
    onSuccess: (responseData) => {
      localStorage.setItem("access_token", responseData.access_token);
      localStorage.setItem("userData", JSON.stringify(responseData.payload));
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const isTokenValid = payload.exp && Date.now() / 1000 < payload.exp;

      return isTokenValid;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  return { handleSignIn, isPending, isAuthenticated };
}

export function useSignUpUser() {
  const navigate = useNavigate();
  const { isPending, mutate: handleSignUp } = useMutation<
    void,
    unknown,
    UserData,
    unknown
  >({
    // @ts-expect-error
    mutationFn: (userData: UserData) => signUpApi(userData),
    onSuccess: () => {
      toast.success("Account Successfully Created");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Error Creating Account or Account Already exist");
    },
  });

  return { handleSignUp, isPending };
}

export function useFriendsList() {
  const { isFetching, data: friendsData } = useQuery({
    queryKey: ["friendslist"],
    queryFn: () => getFriendList(),
  });

  return { isFetching, friendsData };
}

export function useSendFriendRequest() {
  const { isPending, mutate: handleSendRequest } = useMutation<
    void,
    unknown,
    UserData,
    unknown
  >({
   // @ts-expect-error
    mutationFn: (userData: UserData) => sendFriendRequestApi(userData),
    onSuccess: () => {
      toast.success("Request successfully");
    },
    onError: () => {
      toast.error("Error Sending Request successfully");
    },
  });

  return { handleSendRequest, isPending };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
