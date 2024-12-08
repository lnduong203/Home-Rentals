import MainLayout from "../layouts/MainLayout";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Slide from "../components/Slide";

import { slides } from "../data";


const HomePage = () => {
  return (
    <MainLayout>
      <Slide slides={slides} />
      <Categories />
      <Listings />
    </MainLayout>
  );
};
export default HomePage;
