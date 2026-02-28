import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { Sidebar } from "./Sidebar";
// import StatsLayout from "./StatsLayout";
import "../styles/dashboard.css";
// import MainLayout from "./MainLayout";


export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 769); // open by default on desktop

  // Listen to resize to auto-hide sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 769) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stats = {
    total_users: 120,
    total_devices: 45,
    today_checkins: 18,
    today_checkouts: 12,
  };

  const data = {
    "2026-02-01": { IN: 5, OUT: 3 },
    "2026-02-02": { IN: 6, OUT: 4 },
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} data={data} stats={stats}/>
      <DashboardLayout
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
    </div>
  );
};
