"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SideBarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 h-full w-64 dark:bg-backgroundaccent bg-backgroundaccent text-white p-4 z-50"
        >
          <button onClick={() => setSidebarOpen(false)} className="text-white mb-4">Close Sidebar</button>
          <div>Sidebar Content</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;