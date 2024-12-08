import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import ProfileSetting from "./pages/Profile";
import TripList from "./pages/TripList";

import ErrorPage from "./pages/ErrorPage";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import SearchPage from "./pages/SearchPage";
import ForgotPassWord from "./pages/Auth/ForgotPassWord";
import ResetPassWord from "./pages/Auth/ResetPassword";
import ChangePassword from "./pages/Profile/ChangePassword";
import TripListDetails from "./pages/TripList/TripListDetails";
import Payment from "./components/Payment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/edit-profile" element={<ProfileSetting />} />
          <Route path="/:userId/trip-list" element={<TripList />} />
          <Route path="/trip-details/:tripId" element={<TripListDetails />} />
          <Route path="/:userId/wish-list" element={<WishList />} />
          <Route path="/:userId/property-list" element={<PropertyList />} />
          <Route path="/forgot-password" element={<ForgotPassWord />} />
          <Route path="/user/verify" element={<ResetPassWord />} />
          <Route path="/user/change-password" element={<ChangePassword />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
