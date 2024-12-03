// import { useState } from "react";
import { useSelector } from "react-redux";

import ListingCard from "../components/ListingCard";
import MainLayout from "../layouts/MainLayout";
// import Loading from "../components/Loading";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
//   const [loading, setLoading] = useState(true);

  return (
    <MainLayout>
      <div className="px-[10vw]">
        <h2 className="text-4xl font-bold text-blue-900">Your Wish List</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7">
          {!wishList ? (
            <p>You don't have any trip yet</p>
          ) : (
            wishList?.map((wish) => (
              <ListingCard key={wish._id} listing={wish} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default WishList;
