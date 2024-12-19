import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import { facilities } from "../utils/data";
import { API_URL } from "../utils/constants";

const HouseInfo = ({ listing }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <>
      <div className="flex justify-between py-8">
        <h1 className="text-4xl font-bold text-blue-900">{listing?.title}</h1>
        <button className="flex items-center gap-3 text-lg md:text-[1.3vw]">
          {isLiked ? (
            <FaHeart
              className="cursor-pointer text-red-600"
              onClick={() => setIsLiked(false)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer"
              onClick={() => setIsLiked(true)}
            />
          )}
          Save
        </button>
      </div>
      <div className="rounded-lg bg-white p-5">
        <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3">
          {listing?.listingPhotoPaths?.map((photo, index) => (
            <div key={`photo-${index}`} className="border shadow-lg">
              <img
                src={`${API_URL}/${photo.replace("public", "")}`}
                alt="home-image"
                className="h-72 w-full object-cover"
              />
            </div>
          ))}
        </div>

        <h2 className="mb-2 text-xl font-bold text-rose-400 md:text-2xl">
          {listing?.type} in {listing?.city}, {listing?.province},{" "}
          {listing?.country}
        </h2>
        <p className="text-md mb-5">
          {listing?.guestCount} guest - {listing?.bedroomCount} bedroom(s) -{" "}
          {listing?.bedCount} bed(s) - {listing?.bathroomCount} bathroom(s)
        </p>
        <hr className="rounded-lg border-[1.5px] border-gray-400" />
        <div className="flex items-center gap-4 py-3">
          <img
            src={
              listing?.creator?.profileImagePath?.includes("public")
                ? `${API_URL}/${listing?.creator?.profileImagePath.replace("public", "")}`
                : `${listing?.creator?.profileImagePath}`
            }
            alt="profile"
            className="h-14 w-14 rounded-full object-cover"
          />
          <h3 className="text-lg font-bold">
            Hosted by {listing?.creator?.firstName} {listing?.creator?.lastName}
          </h3>
        </div>
        <hr className="rounded-lg border-[1.5px] border-gray-400" />

        <h3 className="pt-5 text-xl font-bold">Description</h3>
        <p className="my-3">{listing?.description}</p>
        <hr className="rounded-lg border-[1.5px] border-gray-400" />

        <h3 className="pt-5 text-xl font-bold">{listing?.highlight}</h3>
        <p className="my-3">{listing?.highlightDetail}</p>
        <hr className="rounded-lg border-[1.5px] border-gray-400" />

        <div className="grid grid-cols-2 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="pt-5 text-2xl font-bold">What this place offers?</h2>
            <div className="my-5 grid grid-cols-2 gap-3 px-4">
              {listing?.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 md:my-2">
                  <div className="text-xl md:text-4xl">
                    {
                      facilities.find((facility) => facility.name === amenity)
                        ?.icon
                    }
                  </div>
                  <p className="text-[2.5vw] font-bold md:text-lg">{amenity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HouseInfo;
