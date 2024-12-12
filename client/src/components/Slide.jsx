import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slide = ({ slides, button }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides?.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides?.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5 * 1000);
    return () => clearInterval(interval); // Clear interval khi component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides?.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className="relative flex h-full w-full flex-shrink-0 justify-center"
          >
            <img
              src={
                slide.image ||
                `http://localhost:6789/${slide.replace("public", "")}`
              }
              alt={`slide-${index}`}
              className={`object-cover h-full w-full ${slide.image ? "brightness-50" : "rounded-t-lg"}`}
            />
            <h3 className="font-manrope absolute top-[30%] mt-5 w-5/6 bg-gradient-to-r from-rose-400 to-blue-500 bg-clip-text text-center text-[5vw] font-extrabold leading-snug text-transparent md:top-5">
              {slide.title || ""}
            </h3>
            {button && (
              <button className="absolute top-1/2 rounded border-2 border-gray-200 bg-gradient-to-r from-rose-400 to-blue-500 px-6 py-3 text-white opacity-85">
                Getting Started
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="absolute top-0 z-10 flex h-full w-full items-center justify-between text-[2.5vw] text-rose-500">
        <button
          className="ml-5 rounded-full opacity-80 duration-500 hover:-translate-x-2 hover:bg-rose-100"
          onClick={prevSlide}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="mr-5 rounded-full opacity-80 duration-500 hover:translate-x-2 hover:bg-rose-100"
          onClick={nextSlide}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Slide;
