import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { SIDE_BAR_ITEMS } from "../utils/data";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constant";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
      className={`realative z-10 flex-shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"} `}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="flex h-full flex-col border-r border-gray-700 bg-gray-800 bg-opacity-50 p-4 backdrop-blur-md">
        <div
          className={`flex ${isSidebarOpen ? "" : "flex-col gap-2"} " items-center justify-between`}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="max-w-fit rounded-full p-2 transition-colors hover:bg-gray-700"
          >
            <Menu size={24} />
          </motion.button>
          <motion.div className="flex items-center gap-2">
            <p className={`${isSidebarOpen ? "" : "hidden"}`}>
              Hi, {user.lastName}
            </p>
            <img
              className="h-12 w-12 rounded-full border-2 border-green-500 object-cover"
              src={
                user.profileImagePath.includes("public")
                  ? `${API_URL}/${user.profileImagePath.replace("public", "")}`
                  : user.profileImagePath
              }
              alt="avatar"
            />
          </motion.div>
        </div>

        <nav className="mt-4 flex-grow border-t border-gray-600">
          {SIDE_BAR_ITEMS.map((item, index) => (
            <Link to={item.path} key={item.path}>
              <motion.div
                className="mb-2 flex items-center rounded-lg p-4 text-sm font-medium transition-colors hover:bg-gray-700"
                whileHover={{ x: -5 }}
              >
                <item.icon size={20} color={item.color} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.1, delay: 0.1 * index }}
                      className="ml-4 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default SideBar;
