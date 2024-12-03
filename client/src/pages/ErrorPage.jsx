import { Link } from "react-router-dom";



const ErrorPage = () => {
  return (
    <div>
      <section className="page_404 bg-white py-10 font-serif">
        <div className="container mx-auto">
          <div className="row flex justify-center">
            <div className="col-sm-12 text-center">
              <div className="text-4xl font-bold md:text-6xl">
                <h1>404</h1>
                <h1>Not Found !</h1>
              </div>
              <div
                className="h-[50vh] w-[100vw] bg-center bg-no-repeat"
                style={{
                  "background-image":
                    "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                }}
              ></div>
              <div className=" ">
                <h3 className="text-2xl">Look like you're lost</h3>
                <p className="text-lg">
                  The page you are looking for is not available!
                </p>
                <Link
                  to="/"
                  className="4 mt-5 inline-block rounded bg-rose-500  px-4 py-2 text-white"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ErrorPage;
