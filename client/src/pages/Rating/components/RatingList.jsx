import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import RatingDetails from "./RatingDetails";

const RatingList = ({ rating }) => {
  const [current, setCurrent] = useState(0);
  const prevSlide = () => {
    setCurrent(current === 0 ? rating?.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === rating?.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5 * 1000);
    return () => clearInterval(interval); // Clear interval khi component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 20}%)` }}
      >
        <div className="mt-3 flex w-1/2 gap-4 md:w-1/3 lg:w-1/4">
          {rating?.map((rate) => (
            <RatingDetails key={rate._id} rate={rate} />
          ))}
        </div>
      </div>
      {rating?.length > 1 && (
        <div className="absolute top-0 z-10 flex h-full w-full items-center justify-between text-[2.5vw] text-rose-500">
          <button
            className="ml-2 rounded-full opacity-80 duration-500 hover:-translate-x-2 hover:bg-rose-100"
            onClick={prevSlide}
          >
            <IoIosArrowBack className="opacity-55" />
          </button>
          <button
            className="mr-2 rounded-full opacity-80 duration-500 hover:translate-x-2 hover:bg-rose-100"
            onClick={nextSlide}
          >
            <IoIosArrowForward className="opacity-55" />
          </button>
        </div>
      )}
    </div>
  );
};
export default RatingList;
