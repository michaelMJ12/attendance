export interface AttendanceEvent {
    id: number;
    user: number;                 // user ID
    device: number | null;        // device ID (nullable)
    timestamp: string;            // ISO datetime from backend
    event_type: "IN" | "OUT";     // Django choices
    source: string;               // e.g. "FINGERPRINT"
}
