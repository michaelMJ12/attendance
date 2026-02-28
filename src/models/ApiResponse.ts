import type { AttendanceEventType } from "../enums/AttendanceEventType";
import type { AttendanceSource } from "../enums/AttendanceSource";

export interface ApiResponse<T> {
  success: string;
  data: T;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResponse<T[]>;
}


export interface DeleteApiResponse {
  success: string
}


export interface LogoutApiResponse {
  success: string
}


export interface ApiIngestResponse{
    message: string
}

export interface MonthlyReportParams {
  user_id: number;
  month: number;
  year: number;
}


export interface DailyAttendanceCount {
  IN: number;
  OUT: number;
}

export type DailyAttendanceTrend = Record<string, DailyAttendanceCount>;


export interface AttendanceCsvRow {
  user_email: string;
  device_id: string;
  event_type: AttendanceEventType;
  timestamp: string;
  source: AttendanceSource;
}
