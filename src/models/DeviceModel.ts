export interface Device {
    device_id: string;
    name: string;
    location: string;
    api_key: string;
    ip_address: string | null;
    last_seen: string | null;  
    activation_code: string | null ;
}
