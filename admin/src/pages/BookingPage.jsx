import { motion } from "framer-motion";
import { CheckCircle, Clock, ShoppingBag } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import LineChartComponent from "../components/common/LineChartComponent";
import BookingDistribution from "../components/Booking/BookingDistribution";
import BookingTable from "../components/Booking/BookingTable";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
const data = [
  { name: "17/12", Booking: 26 },
  { name: "18/12", Booking: 30 },
  { name: "19/12", Booking: 32 },
  { name: "20/12", Booking: 28 },
  { name: "21/12", Booking: 34 },
  { name: "22/12", Booking: 30 },
  { name: "23/12", Booking: 32 },
];
const BookingPage = () => {
  const [bookings , setBookings] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const getBookingData = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/bookings`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
        setTypeData(data.bookingTypeStatistics);
        setBookingData(data.bookingLastWeek);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Bookings" />
      <main className="mx-auto max-w-7xl px-3 py-8 lg:px-4 xl:px-12">
        <motion.div
          className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Bookings"
            icon={ShoppingBag}
            value={bookings.length} 
            color="#EC4899"
          />
          <StatCard
            name="Vacant Home"
            icon={Clock}
            value="1,200"
            color="#10B981"
          />
          <StatCard
            name="Booking Home"
            icon={CheckCircle}
            value="1,200"
            color="#8B5CF6"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LineChartComponent
            title="Daily Booking"
            className="h-80"
            data={bookingData}
            first_line={"Booking"}
            // second_line={"Sales"}
            
          />
          <BookingDistribution data={typeData}/>
        </div>
        <div className="my-8">
          <BookingTable bookings={bookings} />
        </div>
      </main>
    </div>
  );
};
export default BookingPage;
