export const AttendanceDisputeStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type AttendanceDisputeStatus =
  typeof AttendanceDisputeStatus[keyof typeof AttendanceDisputeStatus];
