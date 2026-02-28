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
    FaFileAlt,
    FaInstagram,
    FaGoogle,
    FaPlus,
    FaTimes,
    FaDesktop,
    FaClock,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/policy-table.css";
import type { AttendancePolicy } from "../models/PolicyModel";

/* ------------------ MOCK POLICY DATA ------------------ */
const policyRecords: AttendancePolicy[] = [
    { id: 1, late_grace_minutes: 15, half_day_hours: 4, allow_multiple_checkins: false },
    { id: 2, late_grace_minutes: 10, half_day_hours: 5, allow_multiple_checkins: true },
    { id: 3, late_grace_minutes: 12, half_day_hours: 4, allow_multiple_checkins: true },
    { id: 4, late_grace_minutes: 14, half_day_hours: 5, allow_multiple_checkins: true },
    { id: 5, late_grace_minutes: 16, half_day_hours: 2, allow_multiple_checkins: true },
];

type Props = {
    isOpen: boolean;
};

export const AttendancePolicyPage: FC<Props> = ({ isOpen }) => {

    const [search, setSearch] = useState("");
    const [openDashboard, setOpenDashboard] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState<Omit<AttendancePolicy, "id">>({
        late_grace_minutes: 0,
        half_day_hours: 0,
        allow_multiple_checkins: false,
    });

    const ITEMS_PER_PAGE = 5;

    const filteredRecords = policyRecords.filter(
        (p) =>
            p.late_grace_minutes.toString().includes(search) ||
            p.half_day_hours.toString().includes(search)
    );

    useEffect(() => setCurrentPage(1), [search]);

    const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Policy:", formData);
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
            <main className={`main-content ${showForm ? "show-form" : ""}`}>

                {/* ================= TABLE COLUMN ================= */}
                <section className="table-column">

                    <div className="table-header">
                        <h2>Attendance Policies</h2>

                        <div className="table-actions">
                            <input
                                className="search-input"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button
                                className="create-btn"
                                onClick={() => setShowForm(true)}
                            >
                                <FaPlus /> Create Policy
                            </button>
                        </div>
                    </div>

                    <div className="glass-table-wrapper">
                        <table className="glass-table">
                            <thead>
                                <tr>
                                    <th>Late Grace (mins)</th>
                                    <th>Half Day Hours</th>
                                    <th>Multiple Checkins</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedRecords.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.late_grace_minutes}</td>
                                        <td>{p.half_day_hours}</td>
                                        <td>{p.allow_multiple_checkins ? "Yes" : "No"}</td>
                                        <td className="actions">
                                            <button className="review">Review</button>
                                            <button className="update">Update</button>
                                            <button className="delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            Prev
                        </button>
                        <span>{currentPage} / {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </div>

                </section>

                {/* ================= FORM COLUMN ================= */}
                <section className="form-column">
                    <form className="glass-form" onSubmit={handleSubmit}>

                        <div className="form-header">
                            <h3>Create Policy</h3>
                            <button type="button" className="close-btn" onClick={() => setShowForm(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <input
                            type="number"
                            placeholder="Late Grace Minutes"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    late_grace_minutes: +e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Half Day Hours"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    half_day_hours: +e.target.value
                                })
                            }
                        />

                        <div className="fix">
                            <label>Allow Multiple Checkins</label>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        allow_multiple_checkins: e.target.checked
                                    })
                                }
                            />
                        </div>

                        <button type="submit" className="submit-btn">Save Policy</button>
                    </form>
                </section>

            </main>

        </div>
    );
};
