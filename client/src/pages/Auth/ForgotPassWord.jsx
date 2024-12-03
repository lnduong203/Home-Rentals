import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassWord = () => {
  const [email, setEmail] = useState("");
  // const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:6789/user/forgot-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        toast.success("Please check your email to reset your password");
      } else {
        toast.error("Invalid email");
      }
    } catch (error) {
      console.log("Error sending email", error.message);
    }
  };
  return (
    <main id="content" role="main" className="mx-auto w-full max-w-md p-6">
      <div className="mt-7 rounded-xl border-2 border-rose-500 bg-white shadow-lg">
        <ToastContainer />
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-rose-500 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                className="font-medium text-blue-600 hover:text-rose-400 decoration-1 hover:underline"
                to="/login"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="email"
                    className="mb-2 ml-1 block text-sm font-bold dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-2 border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p
                    className="mt-2 hidden text-xs text-red-600"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-rose-400 hover:bg-white hover:text-rose-400"
                >
                  Reset password
                </button>
              </div>
            </form>

            <Link to="/login" className="flex items-center italic gap-[2px] mt-2 text-blue-600 hover:text-rose-400 text-[0.9vw] decoration-1 hover:underline">
              <FaArrowLeft />
              Previous?
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ForgotPassWord;
