export const FingerprintEventType = {
  IN: "IN",
  OUT: "OUT",
} as const;

export type FingerprintEventType = typeof FingerprintEventType[keyof typeof FingerprintEventType];
