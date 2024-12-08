import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { categories } from "../data.js";
import { setListings } from "../redux/state.js";
import ListingCard from "./ListingCard.jsx";
import Loading from "./Loading.jsx";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [showCard, setShowCard] = useState(false);

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:6789/properties/?q=${selectedCategory === "All" ? "" : `${selectedCategory}`}`,
        { method: "GET" },
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch listings", error.message);
    }
  };
  useEffect(() => {
    getFeedListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

 
  return (
    <div className="bg-gray-100 py-3">
      <div className="my-[1vw] grid grid-cols-5 gap-2 px-[10vw] md:my-[1.5vw] md:grid-cols-8 md:gap-4">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`${item.label === selectedCategory ? "text-rose-400" : ""} flex cursor-pointer flex-col items-center justify-center p-2 text-gray-600 hover:text-rose-400`}
            onClick={() => setSelectedCategory(item.label)}
          >
            <div className="mb-[1vw] text-[3.5vw] md:text-[2vw]">
              {item.icon}
            </div>
            <p className="text-center text-[2vw] md:text-[1.2vw]">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 gap-4 px-[10vw] md:grid-cols-3">
          {listings?.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Listings;
