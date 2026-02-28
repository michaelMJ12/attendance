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
    FaPlus,
    FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/workshift-table.css";
import type { WorkShift } from "../models/WorkShiftModel";

/* ------------------ MOCK DATA ------------------ */
const workShiftRecords: WorkShift[] = [
    { id: 1, user: 101, name: "Morning Shift", start_time: "08:00", end_time: "16:00", late_after: "08:15" },
    { id: 2, user: 102, name: "Evening Shift", start_time: "16:00", end_time: "00:00", late_after: "16:10" },
    { id: 3, user: 103, name: "Night Shift", start_time: "00:00", end_time: "08:00", late_after: "00:05" },
    { id: 3, user: 103, name: "Night Shift", start_time: "00:00", end_time: "08:00", late_after: "00:05" },
    { id: 3, user: 103, name: "Night Shift", start_time: "00:00", end_time: "08:00", late_after: "00:05" },
    { id: 3, user: 103, name: "Night Shift", start_time: "00:00", end_time: "08:00", late_after: "00:05" },
];

type Props = {
    isOpen: boolean;
};

export const AttendanceWorkShift: FC<Props> = ({ isOpen }) => {
    const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState<Omit<WorkShift, "id">>({
        user: 0,
        name: "",
        start_time: "",
        end_time: "",
        late_after: "",
    });

    const ITEMS_PER_PAGE = 5;

    const filteredRecords = workShiftRecords.filter(
        (w) =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.user.toString().includes(search)
    );

    useEffect(() => setCurrentPage(1), [search]);

    const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted WorkShift:", formData);
        setShowForm(false);
    };

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
            <main className={`main-content ${showForm ? "with-form" : ""}`}>

                {/* FORM COLUMN */}
                <section className="form-column">
                    <form className="glass-form" onSubmit={handleSubmit}>
                        <div className="form-header">
                            <h3>Create Work Shift</h3>
                            <button id="small" type="button" onClick={() => setShowForm(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        {/* <input placeholder="User ID" type="number" onChange={(e) => setFormData({ ...formData, user: +e.target.value })} /> */}
                        <input placeholder="Shift Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <input type="time" onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} />
                        <input type="time" onChange={(e) => setFormData({ ...formData, end_time: e.target.value })} />
                        <input type="time" onChange={(e) => setFormData({ ...formData, late_after: e.target.value })} />

                        <button type="submit">Create Shift</button>
                    </form>
                </section>

                {/* TABLE COLUMN */}
                <section className="table-column">
                    <div className="table-header">
                        <h2>Work Shifts</h2>

                        <div className="table-actions">
                            <input
                                placeholder="Search workshift..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="create-btn" onClick={() => setShowForm(true)}>
                                <FaPlus /> Create Shift
                            </button>
                        </div>
                    </div>

                    <div className="glass-table-wrapper">
                        <table className="glass-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Late After</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRecords.map((w) => (
                                    <tr key={w.id}>
                                        <td>{w.user}</td>
                                        <td>{w.name}</td>
                                        <td>{w.start_time}</td>
                                        <td>{w.end_time}</td>
                                        <td>{w.late_after}</td>
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

                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                        <span>{currentPage} / {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                    </div>
                </section>
            </main>
        </div>
    );
};
