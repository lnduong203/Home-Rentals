import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { API_URL } from "../../utils/constants";

const Rating = () => {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const customerId = useSelector((state) => state.user._id);
  const [ratingPoint, setRatingPoint] = useState(0);
  const [messageRating, setMessageRating] = useState("");

  const handleRating = async () => {
    try {
      const response = await fetch(`${API_URL}/rating/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          ratingPoint,
          evaluate: messageRating,
        }),
      });
      if (response.ok) navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div class="flex min-h-screen flex-col justify-center bg-gray-300 py-6 sm:py-12">
      <div class="py-3 sm:mx-auto sm:max-w-xl">
        <div class="min-w-1xl flex flex-col rounded-xl bg-white shadow-lg">
          <div class="px-12 py-5">
            <h2 class="text-3xl font-semibold text-gray-800">
              Your opinion matters to us!
            </h2>
          </div>
          <div class="flex w-full flex-col items-center bg-gray-200">
            <div class="flex flex-col items-center space-y-3 py-6">
              <span class="text-lg text-gray-800">
                How was quality of the home?
              </span>
              <div class="flex cursor-pointer space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} onClick={() => setRatingPoint(star)}>
                    {star <= ratingPoint ? (
                      <StarRoundedIcon
                        fontSize="large"
                        style={{ color: "#ecc94b" }}
                      />
                    ) : (
                      <StarOutlineRoundedIcon
                        fontSize="large"
                        sx={{ color: "#a0aec0" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div class="flex w-3/4 flex-col">
              <textarea
                rows="3"
                name="messageRating"
                value={messageRating}
                onChange={(e) => setMessageRating(e.target.value)}
                class="resize-none rounded-xl p-4 text-gray-500"
                placeholder="Leave a message, if you want"
              ></textarea>
              <button
                class="my-8 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 py-3 text-lg text-white"
                onClick={handleRating}
                disabled={ratingPoint === 0}
              >
                Rate now
              </button>
            </div>
          </div>
          <div class="flex h-20 items-center justify-center">
            <Link to="/" class="text-gray-600">
              Maybe later
            </Link>
          </div>
        </div>

        <div class="mt-8 text-gray-700">
          <CopyrightIcon />
          2024 by <span class="font-bold">HomeHihi</span>
        </div>
      </div>
    </div>
  );
};
export default Rating;
