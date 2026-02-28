import type { AttendanceDisputeStatus } from "../enums/AttendanceDisputeStatus";

export interface AdminDisputeReviewResponse {
  status: AttendanceDisputeStatus; // APPROVED | REJECTED
}