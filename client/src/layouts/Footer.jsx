import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="block">
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Component */}
          <div className="flex flex-col justify-between sm:flex-row">
            <h2 className="w-full max-w-xl text-3xl font-bold md:text-5xl">
              Lightning fast Webflow Dev made easy
            </h2>
            <div className="mt-8 md:mt-0">
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a94bb99e6cf78_MapPin.svg"
                  alt=""
                  className="mr-3 inline-block"
                />
                <p className="text-sm text-gray-500 sm:text-base">
                  8502 Preston Rd. Inglewood, Maine 98380, USA
                </p>
              </div>
              <div className="mb-4 flex max-w-72 items-start justify-start">
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944119e6cf76_EnvelopeSimple-2.svg"
                  alt=""
                  className="mr-3 inline-block"
                />
                <p className="text-sm text-gray-500 sm:text-base">
                  support@flowspark.co
                </p>
              </div>
            </div>
          </div>
          <div className="mb-14 mt-16 w-full border-b border-black"></div>
          <div className="flex flex-col-reverse items-start justify-between sm:flex-col sm:items-center md:flex-row">
            <div className="mb-4 py-1 text-center font-semibold sm:mb-0 sm:text-center">
              <Link
                to="/"
                className="inline-block py-1.5 pr-6 font-normal text-gray-500 transition hover:text-blue-600 sm:py-2 sm:pr-6 lg:pr-12"
              >
                About
              </Link>
              <Link
                to="/"
                className="inline-block py-1.5 pr-6 font-normal text-gray-500 transition hover:text-blue-600 sm:py-2 sm:pr-6 lg:pr-12"
              >
                Features
              </Link>
              <Link
                to="/"
                className="inline-block py-1.5 pr-6 font-normal text-gray-500 transition hover:text-blue-600 sm:py-2 sm:pr-6 lg:pr-12"
              >
                Works
              </Link>
              <Link
                to="/"
                className="inline-block py-1.5 pr-6 font-normal text-gray-500 transition hover:text-blue-600 sm:py-2 sm:pr-6 lg:pr-12"
              >
                Support
              </Link>
              <Link
                to="/"
                className="inline-block py-1.5 pr-6 font-normal text-gray-500 transition hover:text-blue-600 sm:py-2 sm:pr-6 lg:pr-12"
              >
                Help
              </Link>
            </div>
            <p className="text-sm text-gray-500 sm:text-base">
              © Copyright 2021. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
