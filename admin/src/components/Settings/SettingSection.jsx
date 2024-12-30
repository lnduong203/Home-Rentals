import { motion } from "framer-motion";

const SettingSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg"
    >
      <div className="mb-3 flex items-center">
        <Icon className="mr-3 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};
export default SettingSection;
