import type { AttendanceEventType } from "../enums/AttendanceEventType";
import type { AttendanceSource } from "../enums/AttendanceSource";

export interface AttendanceLogDto {
  user: number;
  device?: number;         // optional
  timestamp: string;
  event_type: AttendanceEventType;
  source?: AttendanceSource; // optional
}
