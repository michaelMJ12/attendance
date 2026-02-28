import { useEffect, useState } from "react";
import "../styles/dashboardlayout.css";
import '../styles/statcard.css';
import profile from '../assets/profile.jpg';
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../api_gateway/auth_api";
import type { LogoutApiResponse } from "../models/ApiResponse";



interface DashboardLayoutProps {
    onToggleSidebar: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onToggleSidebar }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const main = document.querySelector(".dashboard-main");
        const header = document.querySelector(".dashboard-header");
        if (!main || !header) return;

        const onScroll = () => {
            header.classList.toggle("scrolled", main.scrollTop > 5);
        };

        main.addEventListener("scroll", onScroll);
        return () => main.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        console.log("hello world")
        try {
            const response: LogoutApiResponse = await Logout();
            console.log("Logout successful:", response);
            localStorage.removeItem("get_token");        
            localStorage.removeItem("refresh_token");  
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <div className="column">
            <header className="dashboard-header">
                <div className="header-left">
                    <button
                        className="sidebar-toggle"
                        onClick={onToggleSidebar}
                        style={{ display: window.innerWidth < 769 ? "block" : "none" }}
                    >
                        ☰
                    </button>

                    <div className="search-box">
                        <input placeholder="Search..." />
                        <span className="icon">🔍</span>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="dropdown">
                        <button
                            className="notification-btn"
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowProfile(false);
                            }}
                        >
                            🔔
                        </button>
                        {showNotifications && (
                            <div className="dropdown-menu notifications">
                                <p className="dropdown-title">Notifications</p>
                                <hr />
                                <ul>
                                    <li>New user registered</li>
                                    <hr />
                                    <li>Shift updated</li>
                                    <hr />
                                    <li>Policy document added</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="dropdown">
                        <div
                            className="profile-dropdown"
                            onClick={() => {
                                setShowProfile(!showProfile);
                                setShowNotifications(false);
                            }}
                        >
                            <img src={profile} alt="profile" />
                        </div>
                        {showProfile && (
                            <div className="dropdown-menu">
                                <ul>
                                    <li>Profile</li>
                                    <hr />
                                    <li>Settings</li>
                                    <hr />
                                    <li className="logout" onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardLayout;

