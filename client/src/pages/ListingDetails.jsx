import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import { Calendar, DateRangePicker } from "react-date-range";

import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import { facilities } from "../data";
import { useSelector } from "react-redux";

const ListingDetails = () => {
  const customerId = useSelector((state) => state?.user?._id);
  const { listingId } = useParams();
  const navigate = useNavigate();
  

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const countDay = Math.round((end - start) / (1000 * 60 * 60 * 24));

 
  const getListingDetails = async () => {
    try {
      const respone = await fetch(
        `http://localhost:6789/properties/${listingId}`,
        {
          method: "GET",
        },
      );

      const data = await respone.json();
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getListingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  const handleSubmit = async (e) => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * countDay,
      }

      const response = await fetch("http://localhost:6789/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),

      })

      if (response.ok) {
        navigate(`/${customerId}/trip-list`);
      }

    } catch (error) {
      console.log("Submit Booking failled", error.message);
      
    }
  }


  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <div className="bg-gray-200 px-[10vw] pb-8">
        <div className="flex justify-between py-8">
          <h1 className="text-4xl font-bold text-blue-900">{listing.title}</h1>
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
            {listing.listingPhotoPaths?.map((photo, index) => (
              <div key={`photo-${index}`} className="border shadow-lg">
                <img
                  src={`http://localhost:6789/${photo.replace("public", "")}`}
                  alt="home-image"
                  className="h-72 w-full object-fill"
                />
              </div>
            ))}
          </div>

          <h2 className="mb-2 text-xl text-rose-400 font-bold md:text-2xl">
            {listing.type} in {listing.city}, {listing.province},{" "}
            {listing.country}
          </h2>
          <p className="text-md mb-5">
            {listing.guestCount} guest - {listing.bedroomCount} bedroom(s) -{" "}
            {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
          </p>
          <hr className="rounded-lg border-[1.5px] border-gray-400" />
          <div className="flex items-center gap-4 py-3">
            <img
              src={`http://localhost:6789/${listing.creator.profileImagePath.replace("public", "")}`}
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
            />
            <h3 className="text-lg font-bold">
              Hosted by {listing.creator.firstName} {listing.creator.lastName}
            </h3>
          </div>
          <hr className="rounded-lg border-[1.5px] border-gray-400" />

          <h3 className="pt-5 text-xl font-bold">Description</h3>
          <p className="my-3">{listing.description}</p>
          <hr className="rounded-lg border-[1.5px] border-gray-400" />

          <h3 className="pt-5 text-xl font-bold">{listing.highlight}</h3>
          <p className="my-3">{listing.highlightDetail}</p>
          <hr className="rounded-lg border-[1.5px] border-gray-400" />

          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="col-span-2">
              <h2 className="pt-5 text-2xl font-bold">
                What this place offers?
              </h2>
              <div className="my-5 grid grid-cols-2 gap-3 px-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex md:my-2 items-center gap-3">
                    <div className="text-xl md:text-4xl">
                      {
                        facilities.find((facility) => facility.name === amenity)
                          ?.icon
                      }
                    </div>
                    <p className="font-bold text-[2.5vw] md:text-lg">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="pt-5 text-2xl font-bold">
                How long do you want to stay?
              </h2>
              <div className="my-5">
                <DateRange className="bg-gray-100  rounded-md shadow-lg mb-4" ranges={dateRange} onChange={handleSelect} />
                {/* <Calendar  date={new Date()} onChange={handleSelect} /> */}
                {/* <DateRangePicker  ranges={dateRange} onChange={handleSelect} /> */}

                <h2 className="text-xl font-bold">
                  ${listing.price} x {countDay} night{countDay > 1 ? "s" : ""}
                </h2>
                <h2 className="my-3 text-2xl font-bold">
                  Total price: ${listing.price * countDay}
                </h2>
                <p className="my-2">
                  Start Date: {dateRange[0].startDate.toDateString()}
                </p>
                <p>End Date: {dateRange[0].endDate.toDateString()}</p>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={countDay < 1}
                  className="w-3/4 my-[2vw] rounded-lg bg-rose-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black"
                >
                  Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default ListingDetails;
