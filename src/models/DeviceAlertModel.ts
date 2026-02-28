export interface DeviceAlert {
    id: number;
    device: number;        // AttendanceDevice ID
    message: string;
    is_resolved: boolean;
    created_at: string;    // ISO datetime string
}
