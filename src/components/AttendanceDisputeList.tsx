export const AttendanceDisputeList = () => {
  return (
    <div className="card">
      <h3>Pending Attendance Disputes</h3>

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
        </tbody>
      </table>
    </div>
  );
};
