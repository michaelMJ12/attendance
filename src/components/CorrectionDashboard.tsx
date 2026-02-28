import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { Correction } from "./Correction";

export const CorrectionDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 769);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 769) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="dashboard-container">
            {/* PASS STATE HERE */}
            <Correction isOpen={sidebarOpen} />
            <DashboardLayout
                onToggleSidebar={() => setSidebarOpen(prev => !prev)}
            />
        </div>
    );
};
