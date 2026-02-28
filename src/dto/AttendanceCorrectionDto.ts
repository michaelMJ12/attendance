import type { AttendanceEventType } from "../enums/AttendanceEventType";

export interface AttendanceCorrectionDto {
  id: number;                           // primary key
  attendance_log: number;               // ID of the AttendanceLog
  corrected_timestamp: string;          // ISO datetime string
  corrected_event_type: AttendanceEventType;
  approved_by?: number | null;          // ID of the admin approving, optional
  created_at: string;                   // ISO datetime string
}
