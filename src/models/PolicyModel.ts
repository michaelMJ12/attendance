export interface AttendancePolicy {
    id: number;
    late_grace_minutes: number;
    half_day_hours: number;
    allow_multiple_checkins: boolean;
}
