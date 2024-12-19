import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { TbMoodEmpty } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";

import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import { facilities } from "../utils/data";
import { API_URL } from "../utils/constants";
import RatingList from "./Rating/components/RatingList";

const ListingDetails = () => {
  const customerId = useSelector((state) => state?.user?._id);
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [rating, setRating] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [bookedDates, setBookedDates] = useState([]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const countDay = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const getListingDetails = async () => {
    try {
      const respone = await fetch(`${API_URL}/properties/${listingId}`, {
        method: "GET",
      });

      // Lấy danh sách các ngày đã được đặt
      const bookedResponse = await fetch(
        `${API_URL}/bookings/booked-dates/${listingId}`,
        {
          method: "GET",
        },
      );
      const bookedDatesData = await bookedResponse.json();
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const bookedDatesArray = bookedDatesData.map((date) => new Date(date));
      setBookedDates(bookedDatesArray);

      const data = await respone.json();
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getRating = async () => {
    try {
      const response = await fetch(`${API_URL}/rating/${listingId}`, {
        method: "GET",
      });
      if (response.ok) {
        const rating = await response.json();
        setRating(rating);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getListingDetails();
    getRating();
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
      };
      if (customerId === listing.creator._id) {
        toast.error("You can't booking your own home");
      } else {
        const response = await fetch(`${API_URL}/bookings/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm),
        });

        if (response.ok) navigate(`/${customerId}/trip-list`);
      }
    } catch (error) {
      console.log("Submit Booking failled", error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <div className="bg-gray-200 px-[10vw] pb-8">
        <ToastContainer />
        <div className="flex justify-between pt-8">
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
        <p className="my-2 flex items-center gap-2 text-blue-900">
          <MdLocationOn /> {listing.streetAddress}
        </p>
        <div className="rounded-lg bg-white p-5">
          <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3">
            {listing.listingPhotoPaths?.map((photo, index) => (
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
            {listing.type} in {listing.district}, {listing.province},{" "}
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
                listing?.creator?.profileImagePath?.includes("public")
                  ? `${API_URL}/${listing?.creator?.profileImagePath.replace("public", "")}`
                  : `${listing?.creator.profileImagePath}`
              }
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

            <div>
              <h2 className="pt-5 text-2xl font-bold">
                How long do you want to stay?
              </h2>
              <div className="my-5">
                <DateRange
                  className="mb-4 rounded-md bg-gray-100 shadow-lg"
                  ranges={dateRange}
                  onChange={handleSelect}
                  minDate={new Date()}
                  endDatePlaceholder="Check out"
                  disabledDates={bookedDates}
                />

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
                  className="my-[2vw] w-3/4 rounded-lg bg-rose-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black"
                >
                  Booking
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="pt-5 text-2xl font-bold">Customer Reviews</h2>
            {listing?.ratingCount === 0 ? (
              <div className="my-3 ml-5 flex items-center gap-1 md:text-lg">
                <TbMoodEmpty />{" "}
                <p className="font-medium"> There are no reviews yet !</p>
              </div>
            ) : (
              <div class="my-3 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarRoundedIcon
                    fontSize="medium"
                    style={{
                      color:
                        star <= Math.round(listing?.averageRating)
                          ? "#ecc94b"
                          : "#a0aec0",
                    }}
                  />
                ))}
                <p class="text-md ms-2 font-bold text-gray-900 dark:text-white">
                  {Math.round(listing?.averageRating)} out of 5
                </p>
                <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                <span
                  
                  class="text-md font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {listing?.ratingCount} reviews
                </span>
              </div>
            )}

            <RatingList rating={rating} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default ListingDetails;
