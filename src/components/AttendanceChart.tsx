import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AttendanceChart = ({ data }: any) => {
  if (!data) return null;

  const chartData = Object.keys(data).map(date => ({
    date,
    IN: data[date].IN,
    OUT: data[date].OUT,
  }));

  return (
    <div className="chart-card">
      <h3>Attendance Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="IN" stroke="#223381" />
          <Line type="monotone" dataKey="OUT" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
