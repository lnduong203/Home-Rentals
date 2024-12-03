import MainLayout from "../layouts/MainLayout"
import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Slide from "../components/Slide"


const HomePage = () => {
  return (
    <MainLayout>
      <Slide/>
      <Categories/>
      <Listings/>      
    </MainLayout>
  )
}
export default HomePage