import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { API_URL } from "../../utils/constant";
import SearchNotFound from "../common/SearchNotFound";

const ListingTable = ({ listings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredListing, setFilteredListing] = useState(listings);

  useEffect(() => {
    let filteredData = listings?.filter(
      (item) =>
        item.title.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput),
    );
    setFilteredListing(filteredData);
  }, [searchInput, listings]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md"
    >
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
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </thead>

          {filteredListing?.length === 0 ? (
            <SearchNotFound searchValue={searchInput} col={7} />
          ) : (
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
                  <td className="whitespace-nowra px-4 py-3 text-sm text-gray-100">
                    {item.averageRating} ★
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-100">
                    $ {item.price.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-100">
                    <button
                      className="px-2 text-blue-400 hover:text-blue-500"
                      title="Update"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
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
