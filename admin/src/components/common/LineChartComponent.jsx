import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const LineChartComponent = ({
  data,
  title,
  className,
  first_line,
  second_line = false,
}) => {
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
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" />
            <YAxis stroke="#9ca3af" />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: " #4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={first_line}
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 5, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
            {second_line && (
              <Line
                type="monotone"
                dataKey={second_line}
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default LineChartComponent;
