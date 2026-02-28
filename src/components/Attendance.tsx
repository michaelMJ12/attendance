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
import "../styles/attendance-table.css";
import logo from "../assets/logo.png";

/* ------------------ MOCK DATA ------------------ */
const attendanceRecords = [
    {
        id: 1,
        user: { email: "john@example.com" },
        date: "2025-01-21",
        check_in: "08:10",
        check_out: "17:05",
        status: "LATE",
    },
    {
        id: 2,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "ABSENT",
    },
    {
        id: 3,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "PRESENT",
    },
    {
        id: 4,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "HALF_DAY",
    },
    {
        id: 4,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "HALF_DAY",
    },
    {
        id: 4,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "HALF_DAY",
    },
    {
        id: 4,
        user: { email: "mary@example.com" },
        date: "2025-01-21",
        check_in: null,
        check_out: null,
        status: "HALF_DAY",
    },
];

/* ------------------ TYPES ------------------ */
type Props = {
    isOpen: boolean;
};

/* ------------------ COMPONENT ------------------ */
export const Attendance: FC<Props> = ({ isOpen }) => {
    const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);

    /* -------- Pagination State -------- */
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    /* -------- Search Filter -------- */
    const filteredRecords = attendanceRecords.filter(
        (r) =>
            r.user.email.toLowerCase().includes(search.toLowerCase()) ||
            r.status.toLowerCase().includes(search.toLowerCase())
    );

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
        <div className="ok2">
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

            {/* ================= MAIN CONTENT ================= */}
            <div className="attendance-card">
                <div className="attendance-header">
                    <h3>Attendance Records</h3>

                    <input
                        type="text"
                        placeholder="Search by email or status"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="attendance-table-wrapper">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedRecords.map((record) => (
                                <tr key={`${record.id}-${record.status}`}>
                                    <td>{record.user.email}</td>
                                    <td>{record.date}</td>
                                    <td>{record.check_in ?? "—"}</td>
                                    <td>{record.check_out ?? "—"}</td>
                                    <td>
                                        <span
                                            className={`status-pill ${record.status.toLowerCase()}`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button className="review">Review</button>
                                        <button className="delete">Delete</button>
                                    </td>
                                </tr>
                            ))}

                            {paginatedRecords.length === 0 && (
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
                    <div className="table-pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => goToPage(currentPage - 1)}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    className={page === currentPage ? "active" : ""}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            )
                        )}

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
