import { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setWishList } from "../redux/state";
import { categories, types } from "../utils/data";
import Slide from "./Slide";
import { API_URL } from "../utils/constants";

const ListingCard = ({ listing, tripList, property }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLike = wishList?.some((item) => item?._id === listing?._id);
  const [isLiked, setIsLiked] = useState(isLike);

  const handleWishtList = async () => {
    try {
      const respone = await fetch(
        `${API_URL}/user/${user._id}/${listing._id}`,
        {
          method: "PATCH",
        },
      );
      if (respone.ok) {
        const data = await respone.json();
        dispatch(setWishList(data.wishList));
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="w-full flex-shrink-0 duration-300 hover:scale-105 md:py-4">
      <div className="relative rounded-lg border shadow-lg">
        <div className="h-56 md:h-80">
          <Slide
            slides={
              listing?.listingPhotoPaths ||
              tripList?.listingId?.listingPhotoPaths
            }
            button={false}
          />
        </div>

        <button
          className="absolute right-0 top-0 z-10 p-2 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleWishtList();
          }}
        >
          {isLiked ? (
            <FaHeart className="cursor-pointer text-red-600 md:text-[1.3vw]" />
          ) : (
            <FaRegHeart className="cursor-pointer md:text-[1.3vw]" />
          )}
        </button>

        <Link
          to={
            listing
              ? `/properties/${listing._id}`
              : `/trip-details/${tripList._id}`
          }
        >
          <div className="p-5 md:p-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarRoundedIcon
                  fontSize="small"
                  style={{
                    color:
                      star <= Math.round(listing?.averageRating)
                        ? "#ecc94b"
                        : "#a0aec0",
                  }}
                />
              ))}
            </div>
            <h3
              title={listing?.title || tripList?.listingId?.title}
              className="h-6 w-full overflow-hidden font-bold hover:text-rose-400 md:h-8 md:text-lg"
            >
              {listing?.title || tripList?.listingId?.title}
            </h3>
            <div className={`my-1 ${listing ? "grid" : ""} sm:grid-cols-2`}>
              <p className="flex items-center gap-1 text-[2.5vw] text-gray-500 md:text-sm">
                {categories.map((item) =>
                  item.label ===
                  (listing?.category || tripList?.listingId?.category)
                    ? item.icon
                    : "",
                )}

                {listing?.category || tripList?.listingId?.category}
              </p>
              <p
                className={`mt-1 flex items-center gap-1 text-[2.3vw] text-gray-500 md:text-sm`}
              >
                {types.map((item) =>
                  item.name === listing?.type ? item.icon : "",
                )}
                {tripList ? <FaCalendarAlt /> : " "}
                {listing?.type ||
                  tripList?.startDate + " - " + tripList?.endDate}
              </p>
            </div>
            <p className="flex items-center gap-1 text-[2vw] sm:text-sm">
              <FaMapMarkerAlt className="text-gray-600" />
              {listing?.district || tripList?.listingId?.district},{" "}
              {listing?.province || tripList?.listingId?.province},{" "}
              {listing?.country || tripList?.listingId?.province}
            </p>
            <p className="mt-2 text-sm font-bold md:text-lg">
              $ {listing?.price || tripList?.totalPrice}
              <span className="text-[2.2vw] font-thin md:text-sm">
                {" "}
                {listing ? "per night" : "total"}
              </span>
            </p>
          </div>
        </Link>
        {property && (
          <Link to={`/property-details/${listing._id}`}> propery detail</Link>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
