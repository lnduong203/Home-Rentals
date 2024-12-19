import MainLayout from "../layouts/MainLayout";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Slide from "../components/Slide";

import { slides } from "../utils/data";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="h-[90vh]">
        <Slide slides={slides} button={true} />
      </div>
      <Categories />
      <Listings />
    </MainLayout>
  );
};
export default HomePage;
