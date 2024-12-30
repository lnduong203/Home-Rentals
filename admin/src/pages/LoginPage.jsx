import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constant";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( `${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loggedIn = await response.json();

      if (loggedIn && response.ok) {
        console.log("Logged in", loggedIn);
        navigate("/");
      } else {
        console.error("Invalid login");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 p-8 shadow-lg backdrop-blur-md">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <LockKeyhole className="h-14 w-16 text-blue-500" />
          </div>
          <h2 className="mb-5 text-4xl tracking-tight">
            Sign in into your account
          </h2>
        </div>
        <div className="mx-4 my-2 flex justify-center md:mx-0">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl rounded-lg bg-gray-200 p-6 shadow-md"
          >
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="block w-full appearance-none rounded-lg border border-gray-400 bg-white px-3 py-3 font-medium leading-tight text-gray-900 focus:outline-none"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6 w-full px-3 md:w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="block w-full appearance-none rounded-lg border border-gray-400 bg-white px-3 py-3 font-medium leading-tight text-gray-900 focus:outline-none"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="************"
                  required
                />
              </div>
              <div className="mb-3 flex w-full items-center justify-between px-3">
                <label htmlFor="remember" className="flex w-1/2 items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="mr-1 bg-white shadow"
                  />
                  <span className="text-sm text-gray-700">Remember Me</span>
                </label>
                <div className="w-1/2 text-right">
                  <a href="#" className="text-sm tracking-tight text-blue-500">
                    Forget your password?
                  </a>
                </div>
              </div>
              <div className="mb-2 w-full px-3 md:w-full">
                <button
                  type="submit"
                  className="block w-full appearance-none rounded-lg border border-gray-200 bg-blue-600 px-3 py-3 font-bold leading-tight text-gray-100 hover:bg-blue-500 focus:border-gray-500 focus:bg-white focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
