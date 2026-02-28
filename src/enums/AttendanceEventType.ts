export const AttendanceEventType = {
  IN: "IN",
  OUT: "OUT",
} as const;

export type AttendanceEventType =
  typeof AttendanceEventType[keyof typeof AttendanceEventType];
