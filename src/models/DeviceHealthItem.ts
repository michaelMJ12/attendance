import type { DeviceStatus } from "../enums/DeviceStatus";

export interface DeviceHealthItem {
  device_id: string;
  device_name: string;
  status: DeviceStatus;
  last_seen: string | null;       // can be null
  last_seen_human: string;
  alerts: number;
}
