import { Link } from "react-router-dom";
import { categories } from "../data";

const Categories = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-8 md:px-10 md:py-20">
      {/* Container */}

      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold text-blue-900 md:text-5xl">
          Explore Top Categories
        </h2>
        <p className="px-6 my-8 text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          iusto delectus non obcaecati aspernatur modi consequatur inventore,
          eum fugit magni perferendis deserunt neque asperiores optio voluptate
          et expedita qui alias. eum fugit magni perferendis deserunt neque
          asperiores optio voluptate et expedita qui alias.
        </p>
        {/* Content */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:justify-items-stretch md:mb-10 lg:mb-12 lg:gap-6">
          {categories?.slice(1, 7).map((category) => (
            <Link
              key={category.label}
              to="/"
              className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
            >
              <div className="relative h-60 scale-100 rounded-md object-cover duration-300 hover:scale-105">
                <img
                  src={category.img}
                  alt=""
                  className="h-full w-full rounded-md object-cover brightness-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4 text-center text-white hover:text-rose-400">
                  <div className="mb-4 text-[5vw] md:text-[3.5vw]">
                    {category.icon}
                  </div>
                  <p className="mb-4 text-[3vw] font-semibold md:text-[1.5vw]">
                    {category.label}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Categories;
