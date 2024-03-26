import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInUser } from "./useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSignInUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated() ? children : null;
};

export default ProtectedRoute;
