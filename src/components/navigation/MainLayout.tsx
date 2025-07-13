"use client";

import React, { useState } from "react";
import TopBar from "@/components/navigation/TopBar";
import SideBar from "@/components/navigation/SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {!isSidebarOpen && <TopBar setSidebarOpen={setSidebarOpen} />}
      <SideBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {children}
    </>
  );
};

export default MainLayout;