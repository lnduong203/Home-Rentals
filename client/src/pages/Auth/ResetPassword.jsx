import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassWord = () => {
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const [searchPrams] = useSearchParams();
  const email = searchPrams.get("email");
  const token = searchPrams.get("token");

  useEffect(() => {
    setPasswordMatch(password === confirmPassword || confirmPassword === "");
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:6789/user/verify?email=${email}&token=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      if (response.ok) navigate("/login");
    } catch (error) {
      console.log("Error change password", error.message);
    }
  };
  return (
    <main id="content" role="main" className="mx-auto w-full max-w-md p-6">
      <div className="mt-7 rounded-xl border-2 border-rose-500 bg-white shadow-lg">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-rose-500 dark:text-white">
              Change password?
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    for="password"
                    className="mb-2 ml-1 block text-sm font-bold dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => setPassWord(e.target.value)}
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
                <div>
                  <label
                    for="confirmPassword"
                    className="mb-2 ml-1 block text-sm font-bold dark:text-white"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassWord(e.target.value)}
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
                <div className="h-2">
                  {!passwordMatch && (
                    <p className="ml-1 text-xs italic text-red-500">
                      Password are not matching !
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!passwordMatch}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-rose-400 hover:bg-white hover:text-rose-400"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </main>
  );
};
export default ResetPassWord;
