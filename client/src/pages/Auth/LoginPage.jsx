import { useState } from "react";
import { login } from "../../redux/state";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errLogin, setErrLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        const { code } = tokenResponse;

        const response = await fetch(
          "http://localhost:6789/auth/google-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          },
        );

        const loggedIn = await response.json();

        if (loggedIn && response.ok) {
          dispatch(
            login({
              user: loggedIn.user,
              token: loggedIn.token,
            }),
          );
          navigate("/");
        } else {
          setErrLogin(true);
          toast.error("Invalid Google login");
        }
      } catch (error) {
        console.log("Error logging in with Google", error);
        setErrLogin(true);
        toast.error("Error logging in with Google");
      }
    },

    onError: () => {
      setErrLogin(true);
      toast.error("Error logging in with Google");
    },
  });

  const handleResponeFacebook = async (data) => {
    const { accessToken } = data;

    try {
      const response = await fetch(
        "http://localhost:6789/auth/facebook-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        },
      );

      const loggedIn = await response.json();

      if (loggedIn && response.ok) {
        dispatch(
          login({
            user: loggedIn.user,
            token: loggedIn.token,
          }),
        );
        navigate("/");
      } else {
        setErrLogin(true);
        toast.error("Invalid Facebook login");
      }
    } catch (error) {
      console.log("Error logging in with Facebook:", error);
      setErrLogin(true);
      toast.error("Error logging in with Facebook");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6789/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loggedIn = await response.json();

      if (loggedIn && response.ok) {
        dispatch(
          login({
            user: loggedIn.user,
            token: loggedIn.token,
          }),
        );
        navigate("/");
      } else {
        setErrLogin(true);
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log("Error logging in", error.message);
    }
  };

  return (
    <div
      className="flex h-full min-h-screen flex-col justify-center bg-cover py-12 sm:px-6 lg:px-8"
      style={{
        "background-image": "url(/assets/auth-bg.jpg)",
      }}
    >
      {errLogin && <ToastContainer />}
      <div className="mt-8 bg-white px-4 py-8 shadow sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:px-10">
        <div className="mb-12 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-rose-400">
            Sign in to your account
          </h2>
          <p className="max-w mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-rose-400"
            >
              create an account
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`${errLogin ? "border-red-500" : ""} relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                required
                className={`${errLogin ? "border-red-500" : ""} relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-rose-400"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-100 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div title="Login with Facebook " className="relative">
              <img
                className="absolute left-[47%] top-3 h-5 w-5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/900px-2023_Facebook_icon.svg.png"
                alt="login with facebook"
              />
              <FacebookLogin
                appId={process.env.REACT_APP_FB_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={handleResponeFacebook}
                textButton=""
                cssClass="py-[22px] w-full rounded-md border border-gray-300 bg-white   shadow-sm hover:bg-gray-50"
              />
            </div>

            <div title="Login with Google">
              <button
                onClick={() => googleLogin()}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/36px-Google_%22G%22_logo.svg.png"
                  alt="login with google"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
