import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";

import { API_URL } from "../../utils/constant";
import SearchNotFound from "../common/SearchNotFound";
import ModalLayout from "../common/ModalLayout";

import UpdateUser from "./UpdateUser";

const UserTable = ({ users }) => {

  
  const [searchInput, setSearchInput] = useState("");
  const [filteredUser, setFilteredUser] = useState(users);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

 
  
  
  
  useEffect(() => {
    let filteredData = users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchInput) ||
        user.lastName.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput),
    );
    setFilteredUser(filteredData);
  }, [searchInput, users]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md"
    >
      <ModalLayout
        width={"w-1/3"}
        title="Do you want to delete this user?"
        isShow={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={() => {
          setIsDeleteModal(false);
          alert("delete");
        }}
      />

      <div className="users-center flex justify-between p-5">
        <h2 className="text-xl font-semibold text-gray-100">Users Table</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            value={searchInput}
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={18}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto pb-5">
        <table className="w-full">
          <thead>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              STT
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Role
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </thead>

          {(filteredUser?.length === 0 && searchInput !== '') ? (
            <SearchNotFound searchValue={searchInput} col={6} />
          ) : (
            <tbody>
              {filteredUser?.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <ModalLayout
                    width={"w-2/3"}
                    isShow={isUpdateModal}
                    onClose={() => setIsUpdateModal(false)}
                    title="Information Detail"
                  >
                    <UpdateUser userInfo={selectedUser} />
                  </ModalLayout>
                  <td className="w-2 px-4 py-3 text-sm text-gray-100">
                    {index + 1}
                  </td>
                  <td             
                    className="flex cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100"
                  >
                    <img
                      src={
                        user?.profileImagePath.includes("public")
                          ? `${API_URL}/${user?.profileImagePath.replace("public", "")}`
                          : `${user.profileImagePath}`
                      }
                      alt="avatar"
                      className="size-10 rounded-lg border border-white"
                    />
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                    {user.role}
                  </td>
                  <td
                    className={`${user.isActive ? "text-green-400" : "text-red-500"} first-letter:"whitespace-nowrap text-gray-100" px-4 py-3 text-sm font-medium`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-100">
                    <button
                      className="px-2 text-blue-400 hover:text-blue-500"
                      title="Update"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsUpdateModal(true);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                      onClick={() => setIsDeleteModal(true)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </motion.div>
  );
};
export default UserTable;
