export const AttendanceSource = {
  FINGERPRINT: "FINGERPRINT",
  MANUAL: "MANUAL",
  MOBILE: "MOBILE",
} as const;

export type AttendanceSource =
  typeof AttendanceSource[keyof typeof AttendanceSource];
