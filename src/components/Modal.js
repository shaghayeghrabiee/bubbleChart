import React from "react";
import { motion } from "framer-motion";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`backdrop-blur fixed inset-0 h-full flex justify-center items-center transition-colors`}
    >
      <motion.div
        initial={{
          translateY: "-50vh",
        }}
        animate={{
         
          translateY: open ? "0%" : "-50vh",
        }}
        transition={{
          duration: 0.05,
        }}
        className={`bg-white h-4/5 p-6 rounded-xl shadow-lg z-50 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:scale-125"
        >
          X
        </motion.button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
