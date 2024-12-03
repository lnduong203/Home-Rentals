import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === "",
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const registerFrom = new URLSearchParams();
      for (let key in formData) {
        registerFrom.append(key, formData[key]);
      }
      const response = await fetch("http://localhost:6789/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: registerFrom.toString(),
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="h-full bg-cover dark:bg-gray-900"
      style={{
        "background-image": "url(/assets/auth-bg.jpg)",
      }}
    >
      <div className="mx-auto flex h-dvh items-center justify-center">
        <div className="flex w-full lg:w-11/12 xl:w-3/4">
          <div className="hidden h-auto w-full justify-center rounded-l-lg bg-cover lg:block lg:w-5/12 lg:pr-20 dark:bg-gray-800">
            <img src="favicon.ico" alt="logo" />
          </div>
          <div className="w-full rounded-lg bg-white p-5 shadow-md shadow-black lg:w-7/12 dark:bg-gray-700">
            <h3 className="py-4 text-center text-3xl font-bold text-rose-400 dark:text-white">
              Create an Account!
            </h3>
            <form
              className="mb-4 rounded px-8 pb-8 pt-6 dark:bg-gray-800"
              onSubmit={handleSubmit}
            >
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mb-0 md:mr-2 md:w-1/2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="md:ml-2 md:w-1/2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mb-0 md:mr-2 md:w-1/2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******************"
                    required
                  />
                  <div className="h-3">
                    {!passwordMatch && (
                      <p className="ml-1 text-xs italic text-red-500">
                        Password are not matching !
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:ml-2 md:w-1/2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="******************"
                    required
                  />
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="focus:shadow-outline w-full rounded-full bg-rose-500 px-4 py-2 font-bold text-white hover:bg-rose-600 focus:outline-none dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900"
                  type="submit"
                  disabled={!passwordMatch}
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link
                  className="inline-block align-baseline text-sm text-blue-500 hover:text-rose-500 dark:text-blue-500"
                  to="/"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center">
                <Link
                  className="inline-block align-baseline text-sm text-blue-500 hover:text-rose-500 dark:text-blue-500"
                  to="/login"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
