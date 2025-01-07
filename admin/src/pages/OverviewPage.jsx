import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Home, PlaneTakeoff, Users } from "lucide-react";

import { API_URL } from "../utils/constant";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryOverviewChart from "../components/Overview/CategoryOverviewChart";
import LineChartComponent from "../components/common/LineChartComponent";
import { getToken } from "../utils/handlers";
import { useNavigate } from "react-router-dom";

const OverviewPage = () => {
  const [data, setData] = useState({
    totalUser: 0,
    totalBooking: 0,
    totalListing: 0,
  });
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

 

  const getDataOverview = async () => {
    
    const token = getToken();
    // if (!token) {
    //   toast.warning("Token has expired or does not exist");
    //   navigate("/login");
    // }

    try {
      const response = await fetch(
        `${API_URL}/dashboard?email=ngocduongxk2003@gmail.com`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setCategoryData(data.categoryStatistics);
        setBookingData(data.bookingStatistics);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataOverview();
  }, []);

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Overview" />
      <main className="mx-auto max-w-7xl px-3 py-8 lg:px-4 xl:px-12">
        <motion.div
          className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={Users}
            value={data.totalUser}
            color="#EC4899"
          />
          <StatCard
            name="Total Home"
            icon={Home}
            value={data.totalListing}
            color="#8B5CF6"
          />
          <StatCard
            name="Total Booking"
            icon={PlaneTakeoff}
            value={data.totalBooking}
            color="#10B981"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <LineChartComponent
            data={bookingData}
            first_line="Booking"
            second_line="Sales"
            title="Booking Overview"
            className="h-80"
          />
          <CategoryOverviewChart
            title="Category Overview"
            data={categoryData}
          />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
