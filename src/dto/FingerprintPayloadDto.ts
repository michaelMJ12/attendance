import type { FingerprintEventType } from "../enums/FingerprintEventType";

export interface FingerprintPayloadDto {
  biometric_id: string;
  device_id: string;
  timestamp: string;           // ISO datetime string
  event_type: FingerprintEventType;
}
