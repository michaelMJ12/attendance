import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import '../styles/main.css';

interface MainLayoutProps {
    data: Record<string, { IN: number; OUT: number }>;
}


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
        status: "HALF_Day",
    },
];


const MainLayout: React.FC<MainLayoutProps> = ({ data }) => {
    if (!data || Object.keys(data).length === 0) return <p>No data available</p>;

    const chartData = Object.keys(data).map((date) => ({
        date,
        IN: data[date].IN,
        OUT: data[date].OUT,
    }));

    return (
        <section>
            <div className="main">
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
        </section>
    );
};

export default MainLayout;
