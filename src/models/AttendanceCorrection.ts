import type { AttendanceEventType } from "../enums/AttendanceEventType";

export interface AttendanceCorrection{
  id: number;
  attendance_log: number;               // ID of the original AttendanceLog
  corrected_timestamp: string;          // ISO string
  corrected_event_type: AttendanceEventType;
  approved_by?: number | null;          // admin user ID
  created_at: string;                   // ISO string
}
