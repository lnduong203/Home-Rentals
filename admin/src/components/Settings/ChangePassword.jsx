import { useEffect, useState } from "react";
import SettingSection from "./SettingSection";
import { KeyRound } from "lucide-react";

const ChangePassword = () => {
  const [formPassword, setFormPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({
      ...formPassword,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    try {
      console.log(formPassword);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setPasswordMatch(
      formPassword.newPassword === formPassword.confirmPassword ||
        formPassword.confirmPassword === "",
    );
  }, [formPassword.newPassword, formPassword.confirmPassword]);

  return (
    <SettingSection icon={KeyRound} title="Change Password">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex w-[65%] flex-col gap-1">
          <label htmlFor="currentPassword">Current password</label>

          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="************"
            className="rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formPassword.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-[65%] flex-col gap-1">
          <label htmlFor="password">New password</label>

          <input
            id="password"
            name="newPassword"
            type="password"
            placeholder="************"
            className="rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formPassword.newPassword}
          />
        </div>
        <div className="my-3 flex w-[65%] flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm new password</label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="************"
            className="rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formPassword.confirmPassword}
            required
          />
        </div>
        {!passwordMatch && (
          <p className="text-xs italic text-red-500">Passwords do not match!</p>
        )}
        <div className="mt-5 flex w-[65%] justify-end">
          <button
            type="submit"
            disabled={!passwordMatch}
            onClick={handleSubmit}
            className="rounded bg-indigo-600 px-4 py-2 text-end font-bold text-white transition duration-200 hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </SettingSection>
  );
};
export default ChangePassword;
