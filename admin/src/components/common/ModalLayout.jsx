import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ModalLayout = ({
  width,
  children,
  title,
  isShow = false,
  onClose,
  onConfirm,
}) => {
  if (!isShow) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-[100vh] w-full items-center justify-center bg-slate-500 bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`${width} max-h-[95vh] overflow-y-auto rounded-lg bg-white p-5 shadow-lg`}
      >
        {!children ? (
          <div className="flex flex-col gap-4">
            <div className="text-center text-xl font-medium text-black">
              {title}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="rounded-md bg-red-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-green-500 px-4 py-2 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="px-10 py-2">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
              <p className="text-[1.8vw] font-bold text-indigo-800">{title}</p>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-red-500 hover:bg-gray-200 hover:text-red-700"
              >
                <X />
              </button>
            </div>
            {children}
          </div>
        )}
      </motion.div>
    </div>,
    document.body,
  );
};
export default ModalLayout;
