import { useParams } from "react-router-dom";
import CreateListing from "../CreateListing";
import { useSelector } from "react-redux";

const ListingUpdate = () => {
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings);

  const listingDetails = listing.find((listing) => listing._id === listingId);
  console.log(listingDetails);
  

  return (
    <div>
      <CreateListing listingInfo={listingDetails} />
    </div>
  );
};
export default ListingUpdate; 
