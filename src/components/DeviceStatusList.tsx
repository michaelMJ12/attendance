export const DeviceStatusList = () => {
  return (
    <div className="card">
      <h3>Registered Devices</h3>

      <ul className="device-list">
        <li className="online">Device-001 (ONLINE)</li>
        <li className="offline">Device-002 (OFFLINE)</li>
        <li className="inactive">Device-003 (INACTIVE)</li>
      </ul>
    </div>
  );
};
