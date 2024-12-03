import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserProfile } from "../../redux/state";

import MainLayout from "../../layouts/MainLayout";
import SideBar from "./components/SideBar";

const ProfileSetting = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState(false);

  const [formUser, setFormUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImagePath: user.profileImagePath,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (const key in formUser) {
        form.append(key, formUser[key]);
      }
      const response = await fetch(
        `http://localhost:6789/user/update-me/${user._id}`,
        {
          method: "POST",
          body: form,
        },
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserProfile(data));
        setUpdatedUser(true);
        toast.success("Profile updated successfully");
        setFormUser((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormUser({
      ...formUser,
      [name]: value,
      [name]: name === "profileImagePath" ? files[0] : value,
    });
  };

  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28">
        {updatedUser && <ToastContainer />}
        <SideBar />
        <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                Public Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mx-auto mt-8 grid max-w-2xl">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <img
                      className="h-40 w-40 rounded-full object-cover p-1 ring-2 ring-rose-400 dark:ring-indigo-500"
                      src={
                        user.profileImagePath && formUser.profileImagePath
                          ? user.profileImagePath === formUser.profileImagePath
                            ? user.profileImagePath.includes("public")
                              ? `http://localhost:6789/${formUser.profileImagePath.replace("public", "")}`
                              : user.profileImagePath
                            : URL.createObjectURL(formUser.profileImagePath)
                          : "/assets/no-avatar.jpg"
                      }
                      alt="user avatar"
                    />

                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <label htmlFor="profileImage">
                        <div className="cursor-pointer rounded-lg border border-rose-400 bg-white px-7 py-3.5 text-base font-medium text-rose-500 hover:bg-rose-500 hover:text-indigo-100 hover:shadow-lg focus:ring-rose-400">
                          Change picture
                        </div>
                      </label>
                      <input
                        type="file"
                        name="profileImagePath"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        className="rounded-lg border border-indigo-200 bg-white px-7 py-3.5 text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        onClick={() =>
                          setFormUser({ ...formUser, profileImagePath: "" })
                        }
                      >
                        Delete picture
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 items-center text-[#202142] sm:mt-14">
                    <div className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                      <div className="w-full">
                        <label
                          for="first_name"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your first name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="firstName"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Your first name"
                          value={formUser.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label
                          for="last_name"
                          className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="lastName"
                          className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Your last name"
                          value={formUser.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-2 sm:mb-6">
                      <label
                        for="email"
                        className="mb-2 block text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full rounded-lg border border-indigo-300 bg-indigo-50 p-2.5 text-sm text-indigo-900 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="your.email@mail.com"
                        value={formUser.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};
export default ProfileSetting;
