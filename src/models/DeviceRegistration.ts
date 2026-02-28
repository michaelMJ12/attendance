export interface DeviceRegistration {
  device_id: string;
  activation_code: string;
  status: "CREATED";                 // always "CREATED" in this API
  message: string;                    // "Device created. Awaiting activation."
}
