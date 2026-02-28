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
} from "react-icons/fa";
import "../styles/correction-table.css"
import logo from "../assets/logo.png";

/* ------------------ MOCK DATA ------------------ */
import type { AttendanceEventType } from "../enums/AttendanceEventType";
import type { AttendanceCorrection } from "../models/AttendanceCorrection";

export const attendanceCorrections: AttendanceCorrection[] = [
  {
    id: 1,
    attendance_log: 101,
    corrected_timestamp: "2025-01-21T08:10:00Z",
    corrected_event_type: "CHECK_IN" as AttendanceEventType,
    approved_by: 2,
    created_at: "2025-01-21T09:00:00Z",
  },
  {
    id: 2,
    attendance_log: 102,
    corrected_timestamp: "2025-01-21T17:05:00Z",
    corrected_event_type: "CHECK_OUT" as AttendanceEventType,
    approved_by: null,
    created_at: "2025-01-21T18:00:00Z",
  },
  {
    id: 3,
    attendance_log: 103,
    corrected_timestamp: "2025-01-21T08:30:00Z",
    corrected_event_type: "CHECK_IN" as AttendanceEventType,
    approved_by: 3,
    created_at: "2025-01-21T09:15:00Z",
  },
  {
    id: 4,
    attendance_log: 104,
    corrected_timestamp: "2025-01-21T12:00:00Z",
    corrected_event_type: "CHECK_OUT" as AttendanceEventType,
    approved_by: null,
    created_at: "2025-01-21T12:10:00Z",
  },
  {
    id: 5,
    attendance_log: 105,
    corrected_timestamp: "2025-01-21T08:00:00Z",
    corrected_event_type: "CHECK_IN" as AttendanceEventType,
    approved_by: 1,
    created_at: "2025-01-21T08:45:00Z",
  },
  {
    id: 6,
    attendance_log: 106,
    corrected_timestamp: "2025-01-21T16:50:00Z",
    corrected_event_type: "CHECK_OUT" as AttendanceEventType,
    approved_by: 4,
    created_at: "2025-01-21T17:00:00Z",
  },
  {
    id: 7,
    attendance_log: 107,
    corrected_timestamp: "2025-01-21T09:05:00Z",
    corrected_event_type: "CHECK_IN" as AttendanceEventType,
    approved_by: 1,
    created_at: "2025-01-21T09:20:00Z",
  },
];


/* ------------------ TYPES ------------------ */
type Props = {
    isOpen: boolean;
};

/* ------------------ COMPONENT ------------------ */
export const Correction: FC<Props> = ({ isOpen}) => {
     const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);

    /* -------- Pagination State -------- */
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    /* -------- Search Filter -------- */
    const filteredRecords = attendanceCorrections.filter((item) => {
        const query = search.toLowerCase();

        return (
            item.attendance_log.toString().includes(query) ||
            item.corrected_event_type.toLowerCase().includes(query) ||
            new Date(item.corrected_timestamp)
                .toLocaleString()
                .toLowerCase()
                .includes(query)
        );
    });

    /* -------- Reset page on search -------- */
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    /* -------- Pagination Logic -------- */
    const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="ok3">
            {/* ================= SIDEBAR ================= */}
            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="logo-wrapper">
                    <img src={logo} alt="Attendance Logo" className="logo-img" />
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
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaGoogle /></a>
                </div>
            </aside>


             {/* ================= MAIN CARD ================= */}
            <div className="corrections-card glass">
                {/* Header */}
                <div className="corrections-header">
                    <h3>Attendance Corrections</h3>
                    <input
                        type="text"
                        placeholder="Search corrections..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="corrections-table-wrapper">
                    <table className="corrections-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Log ID</th>
                                <th>Corrected Time</th>
                                <th>Event Type</th>
                                <th>Approved By</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedRecords.length > 0 ? (
                                paginatedRecords.map((item) => (
                                    <tr key={item.id}>
                                        <td>#{item.id}</td>
                                        <td>{item.attendance_log}</td>
                                        <td>
                                            {new Date(item.corrected_timestamp).toLocaleString()}
                                        </td>
                                        <td>
                                            <span
                                                className={`event-pill ${item.corrected_event_type.toLowerCase()}`}
                                            >
                                                {item.corrected_event_type}
                                            </span>
                                        </td>
                                        <td>{item.approved_by}</td>
                                        <td>
                                            {item.approved_by ? (
                                                <span className="status approved">Approved</span>
                                            ) : (
                                                <span className="status pending">Pending</span>
                                            )}
                                        </td>
                                        <td className="actions">
                                            <button className="review">Review</button>
                                            <button className="delete">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center" }}>
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ================= PAGINATION ================= */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={currentPage === index + 1 ? "active" : ""}
                                onClick={() => goToPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => goToPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
