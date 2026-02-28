import type { TopDevice } from "./TopDevice";

export interface AdminAttendanceDashboardResponse {
  today: {
    check_ins: number;
    check_outs: number;
  };
  events_today: number;
  total_events: number;
  devices: {
    active: number;
    inactive: number;
    offline: number;
  };
  top_devices: TopDevice[];
}
