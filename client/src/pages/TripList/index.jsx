import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import MainLayout from "../../layouts/MainLayout";
import ListingCard from "../../components/ListingCard";
import { setTripList } from "../../redux/state";
import { API_URL } from "../../utils/constants";

const TripList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tripList = useSelector((state) => state.user.tripList);
  const userId = useSelector((state) => state.user._id);

  const getTripList = async () => {
    try {
      const respone = await fetch(`${API_URL}/user/${userId}/trip-list`, {
        method: "GET",
      });

      const data = await respone.json();

      if (respone.ok) {
        dispatch(setTripList(data));
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]);

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <div className="px-[10vw]">
        <h2 className="my-5 text-4xl font-bold text-blue-900">
          Your Trip List
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7">
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
