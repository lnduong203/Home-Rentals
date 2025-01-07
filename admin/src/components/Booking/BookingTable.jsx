// import { useEffect } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Search, Trash2 } from "lucide-react";
import { API_URL } from "../../utils/constant";
import { toast } from "react-toastify";
import ModalLayout from "../common/ModalLayout";
import ListingDetails from "../Listings/ListingDetails";

const BookingTable = ({ bookings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredListing, setFilteredListing] = useState(bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}/delete`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Booking deleted successfully");
        setFilteredListing((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    let filteredData = bookings?.filter(
      (item) =>
        item.listingId.title.toLowerCase().includes(searchInput) ||
        item.listingId.category.toLowerCase().includes(searchInput),
    );
    setFilteredListing(filteredData);
  }, [searchInput, bookings]);

  
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
        title="Booking Detail"
      >
        <ListingDetails listing={selectedBooking?.listingId} creator={selectedBooking?.hostId} />
      </ModalLayout>

      <ModalLayout
        width="w-1/3"
        onClose={() => setIsDeleteModal(false)}
        isShow={isDeleteModal}
        title="Do you want to delete this booking?"
        onConfirm={() => {
          handleDeleteBooking(selectedBooking?._id);
          setIsDeleteModal(false);
        }}
      />
      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold text-gray-100">Booking List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search booking..."
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
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </thead>

          <tbody>
            {filteredListing?.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-gray-700 hover:bg-gray-800"
              >
                <td className="w-2 px-4 py-3 text-sm font-medium text-gray-100">
                  {index + 1}
                </td>
                <td
                  title={item.title}
                  className="flex items-center gap-2 overflow-hidden whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100"
                >
                  <img
                    src={`${API_URL}/${item?.listingId.listingPhotoPaths[0].replace("public", "")}`}
                    alt="listing thumbnail"
                    className="size-10 rounded-lg border border-white"
                  />

                  {item.listingId.title}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                  {item.listingId.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100">
                  {item.hostId.lastName} {item.hostId.firstName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-100">
                  {item.startDate} to <p>{item.endDate}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100">
                  $ {item.totalPrice.toFixed(2)}
                </td>
                <td className="py-3 pl-3 text-sm text-gray-100">
                  <button
                    className="mx-2 text-blue-400 hover:text-blue-500"
                    title="View"
                    onClick={() => {
                      setIsShowDetail(true);
                      setSelectedBooking(item);
                    }}
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    className="text-red-400 hover:text-red-500"
                    title="Delete"
                    onClick={() => {
                      setSelectedBooking(item);
                      setIsDeleteModal(true);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default BookingTable;
