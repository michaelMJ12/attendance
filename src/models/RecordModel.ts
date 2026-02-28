export type AttendanceStatus =
    | "PRESENT"
    | "ABSENT"
    | "LATE"
    | "HALF_DAY";

export interface AttendanceRecord {
    id: number;
    user: number;                // user ID
    date: string;                // YYYY-MM-DD
    check_in: string | null;     // ISO datetime or null
    check_out: string | null;    // ISO datetime or null
    status: AttendanceStatus;
}
