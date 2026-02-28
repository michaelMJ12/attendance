import { useState, type FC, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaUserShield,
    FaUserGraduate,
    FaClipboardList,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaDesktop,
    FaClock,
    FaFileAlt,
    FaInstagram,
    FaGoogle,
    // FaEdit,
    // FaTrash,
    // FaEye,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/dispute-table.css";

import type { AttendanceEventType } from "../enums/AttendanceEventType";
import type { AttendanceDisputeStatus } from "../enums/AttendanceDisputeStatus";
import type { AttendanceDispute } from "../models/AttendanceDispute";

/* ---------------- MOCK DATA ---------------- */
const disputes: AttendanceDispute[] = [
    {
        id: 1,
        attendance_log: 201,
        requested_by: 12,
        reason: "Missed check-in due to network issue",
        proposed_timestamp: "2025-01-21T08:05:00Z",
        proposed_event_type: "CHECK_IN" as AttendanceEventType,
        status: "PENDING" as AttendanceDisputeStatus,
        created_at: "2025-01-21T09:00:00Z",
    },
    {
        id: 2,
        attendance_log: 202,
        requested_by: 15,
        reason: "Checked out late",
        proposed_timestamp: "2025-01-21T18:10:00Z",
        proposed_event_type: "CHECK_OUT" as AttendanceEventType,
        status: "APPROVED" as AttendanceDisputeStatus,
        reviewed_by: 1,
        reviewed_at: "2025-01-21T19:00:00Z",
        admin_comment: "Approved",
        created_at: "2025-01-21T18:30:00Z",
    },
    {
        id: 3,
        attendance_log: 203,
        requested_by: 20,
        reason: "Forgot to clock out",
        proposed_timestamp: "2025-01-21T17:00:00Z",
        proposed_event_type: "CHECK_OUT" as AttendanceEventType,
        status: "REJECTED" as AttendanceDisputeStatus,
        reviewed_by: 2,
        reviewed_at: "2025-01-21T18:00:00Z",
        admin_comment: "Insufficient evidence",
        created_at: "2025-01-21T17:40:00Z",
    },
];

/* ---------------- TYPES ---------------- */
type Props = {
    isOpen: boolean;
};

/* ---------------- COMPONENT ---------------- */
export const AttendanceDisputes: FC<Props> = ({ isOpen }) => {
    const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);

    /* Pagination */
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    /* Search */
    const filteredDisputes = disputes.filter(
        (d) =>
            d.reason.toLowerCase().includes(search.toLowerCase()) ||
            d.status.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const totalPages = Math.ceil(filteredDisputes.length / ITEMS_PER_PAGE);

    const paginatedDisputes = filteredDisputes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="dashboard-container">
            {/* ============ SIDEBAR ============ */}
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="logo-wrapper">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-item-wrapper">
                        <div
                            className="nav-button"
                            onClick={() => setOpenDashboard(!openDashboard)}
                        >
                            <FaTachometerAlt />
                            <span>Dashboard</span>
                        </div>

                        {openDashboard && (
                            <div className="nav-dropdown">
                                <Link to="/admin/dashboard" className="dropdown-item">
                                    <FaUserShield /> Admin
                                </Link>
                                <Link to="/staff/dashboard" className="dropdown-item">
                                    <FaUsers /> Staff
                                </Link>
                                <Link to="/student/dashboard" className="dropdown-item">
                                    <FaUserGraduate /> Student
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/attendance/list" className="nav-button">
                        <FaClipboardList /> Attendances
                    </Link>

                    <Link to="/correction/list" className="nav-button">
                        <FaClipboardList /> Corrections
                    </Link>

                    <Link to="/dispute/list" className="nav-button">
                        <FaClipboardList /> Disputes
                    </Link>

                    <Link to="/device/list" className="nav-button">
                        <FaDesktop /> Devices
                    </Link>

                    <Link to="/workshift/list" className="nav-button">
                        <FaClock /> WorkShift
                    </Link>

                    <Link to="/policy/list" className="nav-button">
                        <FaFileAlt /> Policy
                    </Link>

                    <Link to="/" className="nav-button">
                        <FaUsers /> Users
                    </Link>
                </nav>

                <div className="sidebar-social">
                    <FaFacebook />
                    <FaTwitter />
                    <FaLinkedin />
                    <FaInstagram />
                    <FaGoogle />
                </div>
            </aside>

            {/* ============ MAIN CONTENT ============ */}
            <main className="attendance-card glass">
                <div className="table-header">
                    <h3>Attendance Disputes</h3>
                    <input
                        type="text"
                        placeholder="Search disputes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-wrapper">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Log</th>
                                <th>Reason</th>
                                <th>Proposed Time</th>
                                <th>Event</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedDisputes.map((d) => (
                                <tr key={d.id}>
                                    <td>#{d.id}</td>
                                    <td>{d.attendance_log}</td>
                                    <td className="truncate">{d.reason}</td>
                                    <td>{new Date(d.proposed_timestamp).toLocaleString()}</td>
                                    <td>
                                        <span className="pill event">
                                            {d.proposed_event_type}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`pill ${d.status.toLowerCase()}`}>
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button className="review">Review</button>
                                        <button className="delete">Delete</button>
                                        <button className="update">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        Prev
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};
