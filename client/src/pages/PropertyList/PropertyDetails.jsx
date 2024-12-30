import { useNavigate, useParams } from "react-router-dom";
import HouseInfo from "../../components/HouseInfo";
import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";

const PropertyDetails = () => {
  const userId = useSelector((state) => state.user._id);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  const getListingDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/properties/${listingId}`, {
        method: "GET",
      });
      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/properties/${listingId}/delete`,
        { method: "DELETE" },
      );
      if (response.ok) {
        navigate(`/${userId}/property-list`);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getListingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);
  return (
    <MainLayout>
      <div className="bg-gray-200 px-[10vw] pb-8">
        <HouseInfo listing={listing} />
        <div className="m-auto flex w-[70%] flex-col justify-around gap-4 md:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/properties/${listingId}/update`)}
            className={`" my-[2vw] w-full rounded-lg bg-green-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black md:w-1/2`}
          >
            Update House
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-3/4 rounded-lg bg-rose-500 py-3 text-lg font-bold text-white hover:shadow-md hover:shadow-black md:my-[2vw] md:w-1/2"
          >
            Delete House
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
export default PropertyDetails;
