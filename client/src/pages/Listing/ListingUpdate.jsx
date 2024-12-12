import { useParams } from "react-router-dom";
import CreateListing from "../CreateListing";
// import { useEffect } from "react";
import { useSelector } from "react-redux";

const ListingUpdate = () => {
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings);

  const listingDetails = listing.find((listing) => listing._id === listingId);

  return (
    <div>
      <CreateListing listingInfo={listingDetails} />
    </div>
  );
};
export default ListingUpdate; 
