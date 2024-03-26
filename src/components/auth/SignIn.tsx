import React, { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSignInUser } from "./useAuth";

const SignIn = () => {
  const { isPending, handleSignIn } = useSignInUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;
    handleSignIn(
      { username, password },
      {
        onSettled: () => {
          setUsername("");
          setPassword("");
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex w-full max-w-md px-6 mx-auto lg:w-2/6 justify-center items-center min-h-screen">
      <div className="flex-1">
        <div className="text-center">
          <p className="mt-3 text-gray-500 ">Sign in to access your account</p>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-gray-600 "
              >
                Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                autoComplete="username"
                placeholder="Teddychuks"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isPending}
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600 ">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  placeholder="pass1234"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <HiOutlineEye
                    className={`h-4 w-4 text-gray-400 ${
                      showPassword ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isPending}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Don&#x27;t have an account yet?
            <Link
              to="/register"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
