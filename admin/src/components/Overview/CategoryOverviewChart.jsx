import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { COLORS } from "../../utils/data";

const CategoryOverviewChart = ({ title, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md"
    >
      <h2 className="mb-4 px-5 pt-5 text-lg font-medium text-gray-100">
        {title}
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>{" "}
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: " #4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default CategoryOverviewChart;
