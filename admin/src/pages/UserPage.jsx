import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, Users } from "lucide-react";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import UserTable from "../components/Users/UserTable";
import { API_URL } from "../utils/constant";
import LineChartComponent from "../components/common/LineChartComponent";

const UserPage = () => {
  const [userData, setUserData] = useState([
    {
      totalUsers: 0,
      newUsersToday: 0,
      activeUsers: 0,
    },
  ]);
  const [users, setUsers] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/users`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setUsers(data.users);
        setUserGrowth(data.userGrowth);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Users" />
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
            value={userData.totalUsers}
            color="#EC4899"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={userData.newUsersToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userData.activeUsers}
            color="#8B5CF6"
          />
        </motion.div>

        <div className="flex flex-col gap-y-8">
          <LineChartComponent
            data={userGrowth}
            first_line="User"
            second_line={false}
            title="User Growth"
            className="h-96"
          />
          <UserTable users={users} />
        </div>
      </main>
    </div>
  );
};
export default UserPage;
