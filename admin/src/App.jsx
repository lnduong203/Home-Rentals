import { Route, Routes, useLocation } from "react-router-dom";

import OverviewPage from "./pages/OverviewPage";
import ListingsPage from "./pages/ListingsPage";
import SideBar from "./components/SideBar";
import UserPage from "./pages/UserPage";
import SettingPage from "./pages/SettingPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function App() {
  const location = useLocation();
  
  const isLoginPage = location.pathname === "/login";
 
  

  // useEffect(() => {
  //   if (!token) {
  //     toast.warning("Token has expired or does not exist");
  //     navigate("/login");
  //   }
  //   console.log("token", token);
    
  // }, [token]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      <ToastContainer />
      {!isLoginPage && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>
      )}

      {!isLoginPage && <SideBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<OverviewPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </div>
  );
}

export default App;
