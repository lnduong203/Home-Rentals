import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Home, BookType, ChartBarStacked } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CategoryOverviewChart from "../components/Overview/CategoryOverviewChart";
import ListingTable from "../components/Listings/ListingTable";
import LineChartComponent from "../components/common/LineChartComponent";
import { API_URL } from "../utils/constant";
import { CATEGORIES } from "../utils/data";
import { getToken } from "../utils/handlers";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [typeData, setTypeData] = useState([]);

  const getDataOverview = async () => {
    const token = getToken();
    if (!token) {
      toast.warning("Token has expired or does not exist");
      navigate("/login");
    }
    try {
      const response = await fetch(`${API_URL}/dashboard/listings?email=ngocduongxk2003@gmail.com&status=`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setTypeData(data.typeStatistics);
        setListings(data.listings);
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
      <Header title="Listings" />
      <main className="mx-auto max-w-7xl px-3 py-8 lg:px-4 xl:px-12">
        <motion.div
          className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Home"
            icon={Home}
            value={listings.length}
            color="#EC4899"
          />
          <StatCard
            name="Total Category"
            icon={ChartBarStacked}
            value={CATEGORIES.length}
            color="#10B981"
          />

          <StatCard
            name="Total Type"
            icon={BookType}
            value="3"
            color="#3B82F6"
          />
        </motion.div>

        <ListingTable listings={listings} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LineChartComponent
            className="h-80"
            data={data}
            first_line="uv"
            second_line={false}
            title="Trend Listing"
          />
          <CategoryOverviewChart title="Type Room" data={typeData} />
        </div>
      </main>
    </div>
  );
};
export default ListingsPage;
