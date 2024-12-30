import { User } from "lucide-react";

import SettingSection from "./SettingSection";
import { useState } from "react";

const Profile = () => {
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
  //  alert(fo rmInfo.email);
  };

  return (
    <SettingSection icon={User} title="Profile">
      <div className="flex">
        <div>
          <img
            src="https://kenh14cdn.com/2020/7/17/brvn-15950048783381206275371.jpg"
            alt="avatar"
            className="mr-10 mt-8 h-24 w-24 rounded-lg border object-cover"
          />
        </div>

        <div className="w-2/3">
          <div className="mb-4 flex gap-5">
            <div className="w-full">
              <label htmlFor="name">Frist name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your frist name..."
                className="w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
                value={formInfo.firstName}
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name..."
                className="w-full rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
                value={formInfo.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email..."
              className="rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
              value={formInfo.email}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded bg-indigo-600 px-4 py-2 text-end font-bold text-white transition duration-200 hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </SettingSection>
  );
};
export default Profile;
