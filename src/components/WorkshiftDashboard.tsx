import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { AttendanceWorkShift } from "./Workshift";





export const WorkshiftDashboard = () => {
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



    return (
        <div className="dashboard-container">
            <AttendanceWorkShift isOpen={sidebarOpen}/>
            <DashboardLayout
                onToggleSidebar={() => setSidebarOpen(prev => !prev)}
            />
        </div>
    );
};
