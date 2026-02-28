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
import logo from "../assets/logo.png";
import "../styles/device-table.css"

/* ------------------ MOCK DATA ------------------ */
const deviceRecords = [
    {
        id: 1,
        device_id: "DEV-001",
        name: "Front Desk Scanner",
        location: "Head Office",
        ip_address: "192.168.1.10",
        last_seen: "2025-01-21 08:10",
        status: "ACTIVE",
    },
    {
        id: 2,
        device_id: "DEV-002",
        name: "Gate Scanner",
        location: "Main Gate",
        ip_address: null,
        last_seen: null,
        status: "OFFLINE",
    },
    {
        id: 3,
        device_id: "DEV-003",
        name: "HR Office Device",
        location: "HR Department",
        ip_address: "192.168.1.22",
        last_seen: "2025-01-20 16:45",
        status: "ACTIVE",
    },
    {
        id: 4,
        device_id: "DEV-004",
        name: "Warehouse Scanner",
        location: "Warehouse",
        ip_address: "192.168.1.30",
        last_seen: "2025-01-19 14:12",
        status: "MAINTENANCE",
    },
    {
        id: 5,
        device_id: "DEV-005",
        name: "Security Desk",
        location: "Security Unit",
        ip_address: null,
        last_seen: null,
        status: "OFFLINE",
    },
    {
        id: 6,
        device_id: "DEV-001",
        name: "Front Desk Scanner",
        location: "Head Office",
        ip_address: "192.168.1.10",
        last_seen: "2025-01-21 08:10",
        status: "ACTIVE",
    },
    {
        id: 7,
        device_id: "DEV-001",
        name: "Front Desk Scanner",
        location: "Head Office",
        ip_address: "192.168.1.10",
        last_seen: "2025-01-21 08:10",
        status: "ACTIVE",
    },
];

/* ------------------ TYPES ------------------ */
type Props = {
    isOpen: boolean;
};

/* ------------------ COMPONENT ------------------ */
export const AttendanceDevice: FC<Props> = ({ isOpen }) => {
    // const [search, setSearch] = useState("");
    // const [openDashboard, setOpenDashboard] = useState(false);

    // /* -------- Pagination State -------- */
    // const ITEMS_PER_PAGE = 5;
    // const [currentPage, setCurrentPage] = useState(1);

    // /* -------- Search Filter -------- */
    // const filteredRecords = attendanceRecords.filter(
    //     (r) =>
    //         r.user.email.toLowerCase().includes(search.toLowerCase()) ||
    //         r.status.toLowerCase().includes(search.toLowerCase())
    // );

    // /* -------- Reset page on search -------- */
    // useEffect(() => {
    //     setCurrentPage(1);
    // }, [search]);

    // /* -------- Pagination Logic -------- */
    // const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

    // const paginatedRecords = filteredRecords.slice(
    //     (currentPage - 1) * ITEMS_PER_PAGE,
    //     currentPage * ITEMS_PER_PAGE
    // );

    // const goToPage = (page: number) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };



    const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);

    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    /* -------- Search -------- */
    const filteredRecords = deviceRecords.filter(
        (d) =>
            d.device_id.toLowerCase().includes(search.toLowerCase()) ||
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.status.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    /* -------- Pagination -------- */
    const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="device">
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

                    <Link to="/admin/users" className="nav-button">
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
            <main className="main-content">
                <div className="table-header">
                    <h2>Device Management</h2>

                    <input
                        type="text"
                        placeholder="Search devices..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-glass">
                    <table className="glass-table">
                        <thead>
                            <tr>
                                <th>Device ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>IP Address</th>
                                <th>Last Seen</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedRecords.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.device_id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.location}</td>
                                    <td>{d.ip_address ?? "—"}</td>
                                    <td>{d.last_seen ?? "—"}</td>
                                    <td>
                                        <span className={`status ${d.status.toLowerCase()}`}>
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
