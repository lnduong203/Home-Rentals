import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { API_URL } from "../../../utils/constants";
import { formatDate, ratingStar } from "../../../utils/handler";
// import { useModalContext } from "../../../components/context/ModalProvider";
// import { useState } from "react";

const RatingDetails = ({ rate }) => {
  // const { openPopup } = useModalContext();
  // const [readMore, setReadMore] = useState(false);

  return (
    <div className="min-w-full rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800">
      <div class="mb-4 flex items-center">
        <img
          class="me-4 h-12 w-12 rounded-xl border border-green-300"
          src={
            rate?.customerId.profileImagePath.includes("public")
              ? `${API_URL}/${rate.customerId?.profileImagePath.replace("public", "")}`
              : `${rate.customerId.profileImagePath}`
          }
          alt="customer avatar"
        />
        <div class="font-bold dark:text-white">
          <p>
            {rate?.customerId.firstName + " " + rate?.customerId.lastName}
            <time class="block text-xs text-gray-500 dark:text-gray-400">
              {formatDate(rate?.createdAt, "hh:MM TT")}
            </time>
          </p>
        </div>
      </div>
      <div class="mb-1 flex flex-wrap space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarRoundedIcon
            fontSize="small"
            style={{ color: star <= rate.ratingPoint ? "#ecc94b" : "#a0aec0" }}
          />
        ))}

        <h3 class="pl-1 text-sm font-semibold text-gray-900 dark:text-white">
          {ratingStar(rate?.ratingPoint)}
        </h3>
      </div>
      <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>Reviewed at {formatDate(rate?.createdAt, "dd-mm-yyyy")}</p>
      </footer>
      <p
        class={`mb-2 h-44 overflow-clip text-[2.3vw] text-gray-500 md:h-52 md:text-xs dark:text-gray-400`}
      >
        {rate?.evaluate}
      </p>
      <button
        // class={`${readMore ? 'hidden': 'inline-block'} text-sm  font-medium text-blue-600 hover:underline dark:text-blue-500`}
        class={`text-sm font-medium text-blue-600 hover:underline dark:text-blue-500`}
      >
        Read more
      </button>
    </div>
  );
};

export default RatingDetails;
