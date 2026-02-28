export interface WorkShift {
    id: number;
    user: number;        // user ID
    name: string;
    start_time: string;  // "HH:MM:SS"
    end_time: string;    // "HH:MM:SS"
    late_after: string;  // "HH:MM:SS"
}
