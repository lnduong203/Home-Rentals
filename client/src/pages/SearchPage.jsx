import { useEffect, useState } from "react";
import { PiWarningOctagonBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setListings } from "../redux/state";
import MainLayout from "../layouts/MainLayout";
import ListingCard from "../components/ListingCard";
import Loading from "../components/Loading";

const SearchPage = () => {
  const { search } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const [loading, setLoading] = useState(true);

  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:6789/properties/?q=${search}`,
        { method: "GET" },
      );
      if (response.ok) {
        const data = await response.json();
       

        dispatch(setListings({ listings: data }));
        setLoading(false);
      }
    } catch (error) {
      console.log("Failed to fetch listings", error.message);
    }
  };
  useEffect(() => {
    getSearchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return loading ? (
    <Loading />
  ) : (
    <MainLayout>
      <div className="px-[10vw]">
        <div className="flex items-center py-[2vw]">
          <PiWarningOctagonBold className="text-xl" />
          <p className="ml-[0.7vw]">Search results for the keywords</p>
          <p className="font-bold">: {search}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7">
          {listings.length < 1 ? (
            <div className="col-span-3 flex items-center justify-center py-[2vw] text-2xl">
              <PiWarningOctagonBold className="text-3xl" />
              <p className="ml-[0.7vw]">
                We did not find any homes for the keyword{" "}
              </p>
              <p className="font-bold">: " {search} "</p>
            </div>
          ) : (
            listings?.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default SearchPage;
