import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
      className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 p-3 shadow-lg backdrop-blur-md"
    >
      <div className="px-3 py-3">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-100">{value}</p>
      </div>
    </motion.div>
  );
};
export default StatCard;
