/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import MainLayout from "../layouts/MainLayout";
import ListingCard from "../components/ListingCard";
import { setPropertyList } from "../redux/state";


const PropertyList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const propertyList = useSelector((state) => state.user.propertyList);
  const userId = useSelector((state) => state.user._id);

  const getPropertyList = async () => {
    try {
      const respone = await fetch(
        `http://localhost:6789/user/${userId}/property-list`,
        {
          method: "GET",
        },
      );

      const data = await respone.json();

      if (respone.ok) {
        dispatch(setPropertyList(data))
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <div className="px-[10vw]">
        <h2 className="text-4xl font-bold text-blue-900">Your Property List</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
          {!propertyList ? (
            <p>You don't have any trip yet</p>
          ) : (
            propertyList?.map((property) => (
              <ListingCard key={property._id} listing={property} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default PropertyList;
