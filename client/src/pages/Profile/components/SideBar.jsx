import { Link } from "react-router-dom";

const SideBar = () => {
  return (
      <>
     {/* <div className="flex w-full flex-col gap-5 bg-white px-3 text-[#161931] md:flex-row md:px-16 lg:px-28"> */}
      {/* {updatedUser && <ToastContainer />} */}
      <aside className="py-4 md:block md:w-1/3 lg:w-1/4">
        <div className="sticky top-12 flex flex-col gap-2 border-r border-indigo-100 p-4 text-[2vw] md:text-sm">
          <h2 className="mb-4 pl-3 text-2xl font-semibold">Settings</h2>

          <Link
            to="/edit-profile"
            className="flex items-center rounded-full border bg-white px-3 py-2.5 font-bold text-indigo-900"
          >
            Pubic Profile
          </Link>
          <Link
            to="/user/change-password"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900"
          >
            Change Password
          </Link>
          <a
            href="/"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900"
          >
            Notifications
          </a>
          <a
            href="/"
            className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900"
          >
            PRO Account
          </a>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
