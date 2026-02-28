export interface FingerprintProfile {
    id: number;
    user: number;          // user ID
    device: number;        // device ID
    biometric_id: string;
    is_active: boolean;
}
