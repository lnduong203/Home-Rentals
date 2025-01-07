import { useState, useEffect } from "react";
import { API_URL } from "../../utils/constant";
import { formatDate, getToken } from "../../utils/handlers";
import Toggle from "../common/Toggle";

import { useNavigate } from "react-router-dom";

const UpdateUser = ({ userInfo }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(userInfo.isActive);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: "",
  });
  const [profileImage, setProfileImage] = useState(userInfo.profileImagePath);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append updatedUserInfo fields
    for (const key in updatedUserInfo) {
      form.append(key, updatedUserInfo[key]);
    }

    // Append profileImage if it's a file
    if (profileImage instanceof File) {
      form.append("profileImagePath", profileImage);
    }

    // Debug FormData
    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

     const token = getToken();
        if (!token) {
          toast.warning("Token has expired or does not exist");
          navigate("/login");
        }

    try {
      const response = await fetch(
        `${API_URL}/user/update-me/${userInfo._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      if (response.ok) {
        console.log("User updated successfully");
      }
    } catch (error) {
      console.log("Failed to update user", error.message);
    }
  };

  const handleToggle = () => {
    setIsChecked((prev) => {
      const newChecked = !prev;
      setUpdatedUserInfo((prevInfo) => ({
        ...prevInfo,
        isActive: newChecked,
      }));
      return newChecked;
    });
  };

  console.log(updatedUserInfo);
  console.log(profileImage);
  

  return (
    <div className="font-std mt-5 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
      <div className="flex flex-col">
        <div className="mb-5 flex flex-col items-center justify-center md:flex-row">
          <div className="text-center">
            <div>
              <img
                src={
                  profileImage instanceof File
                    ? URL.createObjectURL(profileImage)
                    : userInfo.profileImagePath.includes("public")
                      ? `${API_URL}/${userInfo.profileImagePath.replace("public", "")}`
                      : userInfo.profileImagePath
                }
                className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-indigo-800 ring ring-gray-300 transition-transform duration-300 hover:scale-105"
              />
              <input
                type="file"
                name="profileImagePath"
                id="profileImagePath"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <label htmlFor="profileImagePath">
              <div className="cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white ring ring-gray-300 transition-colors duration-300 hover:bg-blue-900 hover:ring-indigo-300">
                Change Profile Picture
              </div>
            </label>
            <p className="mt-2 text-sm font-medium opacity-50">
              Created at: {formatDate(userInfo.createdAt)}
            </p>
          </div>
        </div>

        {/* Information Update Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name and Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                value={updatedUserInfo.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                value={updatedUserInfo.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              value={updatedUserInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="************"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className={`flex gap-2 text-sm font-medium text-gray-700`}
            >
              {" "}
              Status :
              <Toggle onClick={handleToggle} isActive={isChecked} />
              <p className={`${isChecked ? "text-green-400" : "text-red-500"}`}>
                {isChecked ? "Active" : "Inactive"}
              </p>
            </label>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-800 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
