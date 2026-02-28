import type { AttendanceEventType } from "../enums/AttendanceEventType";
import type { AttendanceSource } from "../enums/AttendanceSource";

export interface AttendanceLog {
  id: number;
  user: number;
  device: number | null;
  timestamp: string;
  event_type: AttendanceEventType;
  source: AttendanceSource;
  created_at: string;
}

