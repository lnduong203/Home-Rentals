import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import MainLayout from "../../layouts/MainLayout";
import SideBar from "./components/SideBar";

const ChangePassword = () => {
  const userId = useSelector((state) => state.user._id);
  const [formPassword, setFormPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [checkSamePassword, setCheckSamePassword] = useState(true);
  const [showHideCurrentPass, setShowHideCurrentPass] = useState(false);
  const [showHideNewPass, setShowHideNewPass] = useState(false);
  const [showHideConfirmPass, setShowHideConfirmPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new URLSearchParams();
      form.append("currentPassword", formPassword.currentPassword);
      form.append("newPassword", formPassword.newPassword);

      const respone = await fetch(
        `http://localhost:6789/user/${userId}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        },
      );
      if (respone.ok) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Current password is not correct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPasswordMatch(
      formPassword.newPassword === formPassword.confirmNewPassword ||
        formPassword.confirmNewPassword === "",
    );
    setCheckSamePassword(
      formPassword.currentPassword !== formPassword.newPassword || formPassword.newPassword === "",)
  }, [formPassword.newPassword, formPassword.confirmNewPassword, formPassword.currentPassword]);

  return (
    <MainLayout>
      <ToastContainer />
      <div className="flex w-full gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
        <SideBar />
        <main className="mt-10 min-h-screen w-full items-center py-1 text-[#202142] md:mt-14 md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="relative mb-2 sm:mb-6">
              <label
                for="currentPassword"
                className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
              >
                Current password
              </label>
              <input
                type={`${showHideCurrentPass ? "text" : "password"}`}
                name="currentPassword"
                id="currentPassword"
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="********************"
                onChange={handleChange}
                required
              />
              <button
                className="absolute right-[2px] top-7 p-3 text-indigo-900 opacity-70"
                type="button"
                onClick={() => setShowHideCurrentPass(!showHideCurrentPass)}
              >
                {showHideCurrentPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div className="relative mb-2 sm:mb-6">
              <label
                for="newPassword"
                className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
              >
                New password
              </label>
              <input
                type={`${showHideNewPass ? "text" : "password"}`}
                name="newPassword"
                id="newPassword"
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="********************"
                onChange={handleChange}
                required
              />
              <button
                className="absolute right-[2px] top-7 p-3 text-indigo-900 opacity-70"
                type="button"
                onClick={() => setShowHideNewPass(!showHideNewPass)}
              >
                {showHideNewPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <div className="relative mb-1 sm:mb-3">
              <label
                for="confirmNewPassword"
                className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
              >
                Confirm new password
              </label>
              <input
                type={`${showHideConfirmPass ? "text" : "password"}`}
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="********************"
                onChange={handleChange}
                required
              />
              <button
                className="absolute right-[2px] top-7 p-3 text-indigo-900 opacity-70"
                type="button"
                onClick={() => setShowHideConfirmPass(!showHideConfirmPass)}
              >
                {showHideConfirmPass ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            <div className="h-3">
              {!passwordMatch && (
                <p className="ml-1 text-xs italic text-red-500">
                  Password are not matching !
                </p>
              )}
              {
                !checkSamePassword && (
                  <p className="ml-1 text-xs italic text-red-500">
                    New password must be different from current password !
                  </p>
                )
              }
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!passwordMatch && !checkSamePassword}
                className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </MainLayout>
  );
};
export default ChangePassword;
