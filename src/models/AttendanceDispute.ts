import type { AttendanceDisputeStatus } from "../enums/AttendanceDisputeStatus";
import type { AttendanceEventType } from "../enums/AttendanceEventType";

export interface AttendanceDispute {
  id: number;                           // Primary key
  attendance_log: number;               // ID of the AttendanceLog
  requested_by: number;                 // ID of the user who requested the dispute
  reason: string;                       // Text reason
  proposed_timestamp: string;           // ISO datetime string
  proposed_event_type: AttendanceEventType;
  status: AttendanceDisputeStatus;      // PENDING, APPROVED, REJECTED
  reviewed_by?: number | null;          // ID of the admin reviewing it, optional
  reviewed_at?: string | null;          // ISO datetime string, optional
  admin_comment?: string | null;        // Optional admin comment
  created_at: string;                   // ISO datetime string
}
