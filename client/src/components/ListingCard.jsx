import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setWishList } from "../redux/state";

const ListingCard = ({ listing, tripList }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLike = wishList?.some((item) => item._id === listing._id);
  const [isLiked, setIsLiked] = useState(isLike);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWishtList = async () => {
    try {
      const respone = await fetch(
        `http://localhost:6789/user/${user._id}/${listing._id}`,
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


  const imageCount =
    listing?.listingPhotoPaths?.length ||
    tripList?.listingId?.listingPhotoPaths?.length;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageCount - 1 : prevIndex - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageCount - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="w-full flex-shrink-0 duration-300 hover:scale-105 md:py-4">
      <div className="relative overflow-hidden rounded-lg border shadow-lg">
        {(
          listing?.listingPhotoPaths || tripList?.listingId?.listingPhotoPaths
        )?.map((image, index) => (
          <div className="relative" key={index}>
            <img
              src={`http://localhost:6789/${image.replace("public", "")}`}
              alt="haha"
              className={`${index === currentImageIndex ? "" : "hidden"} h-52 w-full object-cover transition-opacity duration-500 md:h-64 
               
              }`}
            />
          </div>
        ))}
        <button className="absolute right-0 top-1/3 px-2">
          <IoIosArrowForward
            className="cursor-pointer rounded-full bg-white p-1 opacity-45 shadow hover:scale-110 hover:opacity-90 md:text-[1.8vw]"
            onClick={handleNextImage}
          />
        </button>
        <button className="absolute left-0 top-1/3 px-2">
          <IoIosArrowBack
            className="cursor-pointer rounded-full bg-white p-1 opacity-45 shadow hover:scale-110 hover:opacity-90 md:text-[1.8vw]"
            onClick={handlePrevImage}
          />
        </button>

        <button
          className="absolute right-0 top-0 p-2 text-white"
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

        <div className="p-2 md:mt-3 md:p-4">
          <Link
            to={`/properties/${listing?._id || tripList?.listingId?._id}`}
            className="font-bold hover:text-rose-400 md:text-lg"
          >
            {listing?.city || tripList.listingId.city},{" "}
            {listing?.province || tripList.listingId.province},{" "}
            {listing?.country || tripList.listingId.province}
          </Link>
          <p className="text-[2.3vw] text-gray-500 md:text-sm">
            {listing?.category || tripList.listingId.category}
          </p>
          <p className="text-[2.3vw] text-gray-500 md:text-sm">
            {listing?.type || tripList.startDate + " - " + tripList.endDate}
          </p>
          <p className="mt-2 text-sm font-bold md:text-lg">
            {listing?.price || tripList.totalPrice}
            <span className="text-[2.2vw] font-thin md:text-sm">
              {" "}
              {listing ? "per night" : "total"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;