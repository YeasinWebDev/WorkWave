"use client";

import Provider from "@/components/Provider"; // Ensuring the SessionProvider is imported here
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="lg:hidden absolute right-5 top-5">
        <IoMdMenu size={35} onClick={toggleSidebar} color="white"/>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-[#07090F] shadow-lg transition-transform duration-300 lg:transform-none ${
          isSidebarOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        } lg:translate-x-0`}
        style={{ width: "100%", maxWidth: "16rem" }}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="lg:ml-64 px-5 py-10 lg:py-0 min-h-screen bg-[#07090F] text-white">
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </div>
    </div>
  );
}
