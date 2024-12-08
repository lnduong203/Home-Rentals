/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import MainLayout from "../../layouts/MainLayout";
import ListingCard from "../../components/ListingCard";
import { setTripList } from "../../redux/state";

// import { useSearchParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const TripList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tripList = useSelector((state) => state.user.tripList);
  const userId = useSelector((state) => state.user._id);
  
  // const [searchPrams ] = useSearchParams()
  // const message = searchPrams.get("message");
  // switch (message) {
  //   case "cancelBooking": toast.success("Cancel booking successfully");
  //   break;

  //   case "checkout": toast.success("Checkout successfully");
  //   break;

  //   default: 
  //     break;
  // }
 
  const getTripList = async () => {
    try {
      const respone = await fetch(
        `http://localhost:6789/user/${userId}/trip-list`,
        {
          method: "GET",
        },
      );

      const data = await respone.json();

      if (respone.ok) {
        dispatch(setTripList(data))
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      {/* <ToastContainer limit={1} /> */}
      <div className="px-[10vw]">
        <h2 className="text-4xl font-bold text-blue-900">Your Trip List</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
          {!tripList ? (
            <p>You don't have any trip yet</p>
          ) : (
            tripList?.map((trip) => (
              <ListingCard key={trip._id} tripList={trip} />
            ))
          )}

        </div>
      </div>
    </MainLayout>
  );
};
export default TripList;
