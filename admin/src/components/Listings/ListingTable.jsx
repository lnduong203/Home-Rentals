import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";

import { API_URL } from "../../utils/constant";
import SearchNotFound from "../common/SearchNotFound";
import Toggle from "../common/Toggle";
import ModalLayout from "../common/ModalLayout.jsx";
import ListingDetails from "./ListingDetails.jsx";

const ListingTable = ({ listings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredListing, setFilteredListing] = useState(listings);
  const [activeListing, setActiveListing] = useState({});
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleDeleteListing = async (id) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Home deleted successfully");
        setFilteredListing((prev) => prev.filter((item) => item._id !== id));
      } else {
        console.log("Failed to delete listing.");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleActiveListing = async (item) => {
    try {
      const newStatus = !activeListing[item._id];
      const response = await fetch(
        `${API_URL}/properties/${item._id}/update-status?status=${newStatus ? "active" : "inactive"}`,
        { method: "PATCH" },
      );

      if (response.ok) {
        toast.success(
          `Home is ${newStatus ? "active" : "inactive"} successfully`,
        );
        setActiveListing((prev) => ({
          ...prev,
          [item._id]: newStatus,
        }));
      } else {
        console.log("Failed to update listing status.");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    let filteredData = listings?.filter(
      (item) =>
        item.title.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput),
    );
    setFilteredListing(filteredData);

    const initialActiveListings = listings.reduce((acc, listing) => {
      acc[listing._id] = listing.status === "active";
      return acc;
    }, {});
    setActiveListing(initialActiveListings);
  }, [searchInput, listings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md"
    >
      <ModalLayout
        width={"w-4/5"}
        isShow={isShowDetail}
        onClose={() => setIsShowDetail(false)}
        title="Home Detail"
      >
        <ListingDetails listing={selectedListing} />
      </ModalLayout>
      <ModalLayout
        width={"w-1/3"}
        title="Do you want to delete this home?"
        isShow={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={() => {
          setIsDeleteModal(false);
          handleDeleteListing(selectedListing?._id);
        }}
      />
      <ModalLayout
        width={"w-1/3"}
        title={`Do you want to update status this home?`}
        isShow={isActiveModal}
        onClose={() => setIsActiveModal(false)}
        onConfirm={() => {
          setIsActiveModal(false);
          handleActiveListing(selectedListing);
        }}
      />

      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold text-gray-100">Listing Table</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search listing..."
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
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Rating
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
              Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </thead>

          {filteredListing?.length === 0 ? (
            <SearchNotFound searchValue={searchInput} col={8} />
          ) : (
            <tbody>
              {filteredListing?.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="cursor-pointer border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="w-2 px-4 py-3 text-sm font-medium text-gray-100">
                    {index + 1}
                  </td>
                  <td
                    title={item.title}
                    className="flex items-center gap-2 overflow-hidden whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100"
                  >
                    <img
                      src={`${API_URL}/${item?.listingPhotoPaths[0].replace("public", "")}`}
                      alt="listing thumbnail"
                      className="size-10 rounded-lg border border-white"
                    />

                    {item.title}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                    {item.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-100">
                    {item.averageRating} ★
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100">
                    $ {item.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-sm font-medium text-gray-100">
                    <Toggle
                      isActive={activeListing[item._id]}
                      onClick={() => {
                        setActiveListing((prev) => ({
                          ...prev,
                          [item._id]: !prev[item._id],
                        }));
                        setSelectedListing(item);
                        setIsActiveModal(true);
                      }}
                    />
                  </td>
                  <td className="py-3 pl-2 text-sm text-gray-100">
                    <button
                      className="mx-2 text-blue-400 hover:text-blue-500"
                      title="View"
                      onClick={() => {
                        setIsShowDetail(true);
                        setSelectedListing(item);
                      }}
                    >
                      <Eye size={20} />
                    </button>

                    <button
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                      onClick={() => {
                        setSelectedListing(item);
                        setIsDeleteModal(true);
                      }}
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
export default ListingTable;
