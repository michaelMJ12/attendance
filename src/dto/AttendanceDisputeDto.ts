import type { AttendanceEventType } from "../enums/AttendanceEventType";

export interface AttendanceDisputeDto {
  reason: string;
  proposed_timestamp: string;
  proposed_event_type: AttendanceEventType;
}