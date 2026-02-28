import { useState, type FC } from "react";
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
import '../styles/sidebar.css'
import logo from '../assets/logo.png'
import '../styles/StatsDashboard.css'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    id: 2,
    user: { email: "mary@example.com" },
    date: "2025-01-21",
    check_in: null,
    check_out: null,
    status: "PRESENT",
  },
  {
    id: 2,
    user: { email: "mary@example.com" },
    date: "2025-01-21",
    check_in: null,
    check_out: null,
    status: "HALF_DAY",
  },
];

const StatCard = ({ title, value }: any) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);


type Props = {
  isOpen: boolean;
  data: Record<string, { IN: number; OUT: number }>;
  stats: any
};
export const Sidebar: FC<Props> = ({ isOpen, data, stats }) => {
  const [openDashboard, setOpenDashboard] = useState(false);
  if (!stats) return null;


  if (!data || Object.keys(data).length === 0) return <p>No data available</p>;

  const chartData = Object.keys(data).map((date) => ({
    date,
    IN: data[date].IN,
    OUT: data[date].OUT,
  }));

  return (
    <div className="ok">
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Logo */}
        <div className="logo-wrapper">
          <img src={logo} alt="Attendance Logo" className="logo-img" />
        </div>
        {/* <button className="sidebar-toggle">☰</button> */}
        {/* Navigation */}
        <nav className="sidebar-nav">
          {/* DASHBOARD (BOXED + DROPDOWN) */}
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

          {/* ATTENDANCE */}
          <Link to="/attendance/list" className="nav-button">
            <FaClipboardList /> Attendances
          </Link>

          <Link to="/correction/list" className="nav-button">
            <FaClipboardList /> Corrections
          </Link>

          <Link to="/dispute/list" className="nav-button">
            <FaClipboardList /> Disputes
          </Link>

          {/* ADMIN */}
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

        {/* SOCIAL ICONS (STICK TO BOTTOM) */}
        <div className="sidebar-social">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaGoogle /></a>
        </div>
      </aside>


      <div className="main">

        <StatCard title="Users" value={stats.total_users} />
        <StatCard title="Devices" value={stats.total_devices} />
        <StatCard title="Check-ins Today" value={stats.today_checkins} />
        <StatCard title="Check-outs Today" value={stats.today_checkouts} />

        {/* Chart */}
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={350} >
            <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="IN" stroke="#223381" strokeWidth={2} />
              <Line type="monotone" dataKey="OUT" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card1">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Reason</th>
                <th>Proposed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>
              <tr>
                <td>john@example.com</td>
                <td>Missed punch</td>
                <td>2025-01-21 08:10</td>
                <td>
                  <button className="approve">Approve</button>
                  <button className="reject">Reject</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Devices */}
        <div className="device-card">
          <ul className="device-list">
            <li className="online">Device-001 (ONLINE)</li>
            <li className="offline">Device-002 (OFFLINE)</li>
            <li className="inactive">Device-003 (INACTIVE)</li>
            <li className="inactive">Device-004 (ACTIVE)</li>
            <li className="inactive">Device-005 (INACTIVE)</li>
            <li className="inactive">Device-006 (OFFLINE)</li>
            <li className="inactive">Device-006 (ONLINE)</li>

          </ul>
        </div>

        {/* Disputes */}
        {/* Attendance Disputes */}
        <div className="dispute-card glass">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceRecords.map((record: any) => (
                <tr key={record.id}>
                  <td>{record.user.email}</td>
                  <td>{record.date}</td>
                  <td>{record.check_in ?? "—"}</td>
                  <td>{record.check_out ?? "—"}</td>
                  <td>
                    <span className={`status ${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>

  );
};
