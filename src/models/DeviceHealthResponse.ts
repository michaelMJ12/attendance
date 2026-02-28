import type { DeviceHealthItem } from "./DeviceHealthItem";
import type { OfflineDevice } from "./OfflineDevice";

export interface DeviceHealthResponse {
  devices: DeviceHealthItem[];
  offline_count: number;
  offline_devices: OfflineDevice[];
}
