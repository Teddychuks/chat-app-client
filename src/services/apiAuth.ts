import axios from "axios";
import { serverUrl } from "./server";

interface UserData {
  username: string;
  password: string;
}
interface UserData {
  receiverUsername: string;
}

interface Friend {
  friendUsername: string;
}

export async function signInUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const requestData = { username, password };
  const authToken = localStorage.getItem("access_token");
  try {
    const response = await axios.post(`${serverUrl}auth/login`, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function signUpUser(userData: UserData) {
  const authToken = localStorage.getItem("access_token");
  const requestData = { ...userData };

  try {
    const response = await axios.post(
      `${serverUrl}auth/register`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

export async function getFriendList(): Promise<Friend[]> {
  const authToken = localStorage.getItem("access_token");
  const url = `${serverUrl}friends/list`;

  try {
    const response = await axios.get<Friend[]>(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get friends list"
    );
  }
}

export async function sendFriendRequest(receiverUsername: string) {
  const authToken = localStorage.getItem("access_token");
  const requestData = { receiverUsername };

  try {
    const response = await axios.post(
      `${serverUrl}friends/send-request`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get friends list"
    );
  }
}

export async function logout() {
  return null;
}
