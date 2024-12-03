import { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import {
  FaPlane,
  FaHeart,
  FaHome,
  FaClipboardList,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/state";
// import noImage from "../assets/no-avatar.png";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/properties/search/${search}`);
    }
  };

  return (
    <nav className="relative mx-auto flex h-20 w-full items-center justify-between bg-rose-400 px-[10vw]">
      {/* Logo */}
      <div className="inline-flex">
        <Link to="/">
          <div className="md:block">
            <img src="/favicon.ico" alt="logo" className="w-20" />
          </div>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden flex-shrink flex-grow-0 justify-start px-2 sm:block">
        <div className="inline-flex max-w-full items-center rounded-full border px-2 py-1 shadow-sm hover:shadow-gray-200">
          <input
            type="text"
            className="ml-2 text-white placeholder-white border-none bg-transparent focus:border-none focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={handleKeyDown}
          />
          <IconButton>
            <Search
              className="text-white"
              onClick={() =>  navigate(`/properties/search/${search}`)}
            />
          </IconButton>
        </div>
      </div>
      {/* End Search Bar */}

      {/* Login */}
      <div className="flex-initial">
        <div className="relative flex items-center justify-end">
          <div className="mr-4 text-white font-bold flex items-center">
            <Link
              className="inline-block rounded-full px-3 py-2 hover:bg-gray-600"
              to={user ? "/create-listing" : "/login"}
            >
              Become a host
            </Link>
          </div>

          <div className="block">
            <div className="relative inline">
              <button
                type="button"
                onClick={() => setDropDownMenu(!dropDownMenu)}
                className="relative inline-flex  items-center rounded-full border px-2 py-1 hover:shadow-lg"
              >
                <Menu className="m-1 text-gray-500" />
                {!user ? (
                  <Person className="text-gray-500 " />
                ) : (
                  <img
                    // src={`http://localhost:6789/${user.profileImagePath.replace("public", "")} || ${user.profileImagePath}`}
                    src={user.profileImagePath.includes("public") ? `http://localhost:6789/${user.profileImagePath.replace("public", "")}` : user.profileImagePath}
                    // src={`http://localhost:6789/${user.profileImagePath.replace("public", "")}`}
                    alt="user"
                    className="hidden h-10 w-10 rounded-full  border-2 border-green-300 object-cover sm:block"
                  />
                )}
              </button>
              {dropDownMenu && !user && (
                <div className="absolute right-0 z-20 mt-2 flex w-max flex-col rounded-xl border bg-white p-3 text-[2vw] font-bold text-gray-600 sm:text-[1.1vw]">
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to="/login"
                  >
                    <FaSignInAlt /> Login
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 hover:text-rose-500"
                    to="/register"
                  >
                    <FaUserPlus /> Register
                  </Link>
                </div>
              )}
              {dropDownMenu && user && (
                <div className="absolute -right-5 z-20 mt-2 flex w-max flex-col rounded-xl border bg-white p-3 text-[2vw] font-bold text-gray-600 shadow-lg sm:text-[1.1vw] md:right-auto">
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to="/edit-profile"
                  >
                    <FaUser /> Profile
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to={`/${user._id}/trip-list`}
                  >
                    <FaPlane /> Trip List
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to={`/${user._id}/wish-list`}
                  >
                    <FaHeart /> Wish List
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to={`/${user._id}/property-list`}
                  >
                    <FaHome /> Property List
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to={`/${user._id}/reservation-list`}
                  >
                    <FaClipboardList /> Reservation List
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 pb-2 hover:text-rose-500"
                    to="/create-listing"
                  >
                    <FaUserPlus /> Become A Host
                  </Link>
                  <Link
                    className="ml-2 flex items-center gap-x-2 hover:text-rose-500"
                    to="/login"
                    onClick={() => dispatch(logout())}
                  >
                    <FaSignOutAlt /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Login */}
    </nav>
  );
};

export default Navbar;
