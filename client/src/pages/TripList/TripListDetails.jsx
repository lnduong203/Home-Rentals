import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import { Calendar, DateRangePicker } from "react-date-range";

import Loading from "../../components/Loading";
import MainLayout from "../../layouts/MainLayout";
import { facilities } from "../../data";
import { useSelector } from "react-redux";

const TripListDetails = () => {
  const customerId = useSelector((state) => state?.user?._id);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [isCheckin, setIsCheckin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [trip, setTrip] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date() },
  ]);

  const getListingDetails = async () => {
    try {
      const respone = await fetch(`http://localhost:6789/bookings/${tripId}`, {
        method: "GET",
      });

      const data = await respone.json();

      setListing(data.listingId);
      setTrip(data);

      setIsCheckin(data.isCheckIn);
      setLoading(false);
      setDateRange([
        {
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        },
      ]);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const countDay = Math.round(trip?.totalPrice / listing?.price);

  useEffect(() => {
    getListingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const handleCheckin = async () => {
    try {
      const response = await fetch(
        `http://localhost:6789/bookings/check-in/${tripId}`,
        {
          method: "PATCH",
        },
      );

      if (response.ok) {
        getListingDetails();
        toast.success("Check in successful");
      } else toast.error("Check in failled");
    } catch (error) {
      console.log("Check in failled", error.message);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:6789/bookings/cancel-booking/${tripId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) navigate(`/${customerId}/trip-list`);
    } catch (error) {
      console.log("Cancel booking failled", error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <ToastContainer />
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
            {listing?.listingPhotoPaths?.map((photo, index) => (
              <div key={`photo-${index}`} className="border shadow-lg">
                <img
                  src={`http://localhost:6789/${photo.replace("public", "")}`}
                  alt="home-image"
                  className="h-72 w-full object-fill"
                />
              </div>
            ))}
          </div>

          <h2 className="mb-2 text-xl font-bold text-rose-400 md:text-2xl">
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
              src={
                trip?.hostId?.profileImagePath?.includes("public")
                  ? `http://localhost:6789/${trip?.hostId.profileImagePath.replace("public", "")}`
                  : `${trip?.hostId.profileImagePath}`
              }
              alt="profile"
              className="h-14 w-14 rounded-full object-cover"
            />
            <h3 className="text-lg font-bold">
              Hosted by {trip?.hostId.firstName} {trip?.hostId.lastName}
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
                  <div
                    key={amenity}
                    className="flex items-center gap-3 md:my-2"
                  >
                    <div className="text-xl md:text-4xl">
                      {
                        facilities.find((facility) => facility.name === amenity)
                          ?.icon
                      }
                    </div>
                    <p className="text-[2.5vw] font-bold md:text-lg">
                      {amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h2 className="pt-5 text-2xl font-bold">
                How long do you want to stay?
              </h2>
              <div className="my-5 overflow-auto">
                <DateRange
                  className="mb-4 w-[130%] rounded-md bg-gray-100 shadow-lg sm:w-[100%] md:w-[95%]"
                  ranges={dateRange}

                  // startDatePlaceholder={new Date(trip.startDate)}
                  // endDatePlaceholder={new Date(trip.endDate)}
                  // disabledDates={bookedDates}
                  // editableDateInputs={false}
                />

                <h2 className="text-xl font-bold">
                  ${listing.price} x {countDay} night{countDay > 1 ? "s" : ""}
                </h2>
                <h2 className="my-3 text-2xl font-bold">
                  Total price: ${trip.totalPrice}
                </h2>
                <p className="my-2">Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
              </div>
            </div>
          </div>

          <div className="m-auto flex w-[70%] flex-col justify-around gap-4 md:flex-row">
            <button
              type="button"
              onClick={handleCheckin}
              disabled={isCheckin}
              className={`${isCheckin ? "cursor-not-allowed opacity-50" : ""} my-[2vw] w-full rounded-lg bg-green-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black md:w-1/2`}
            >
              Check in
            </button>
            {isCheckin ? (
              <button
                type="button"
                onClick={handleCancelBooking}
                className="w-full rounded-lg bg-rose-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black md:my-[2vw] md:w-1/2"
              >
                Check out
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancelBooking}
                className="w-3/4 rounded-lg bg-rose-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black md:my-[2vw] md:w-1/2"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>{" "}
      </div>
    </MainLayout>
  );
};
export default TripListDetails;
