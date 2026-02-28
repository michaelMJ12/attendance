import axios from "axios"
import type { ApiIngestResponse, ApiResponse, DailyAttendanceTrend, MonthlyReportParams } from "../models/ApiResponse"
import { Auth_Header } from "./auth_api"
import type { FingerprintPayloadDto } from "../dto/FingerprintPayloadDto"
import type { MonthlyAttendanceReport } from "../models/MonthlyAttendanceReport"
import type { DeviceRegistrationDto } from "../dto/DeviceRegistrationDto"
import type { DeviceRegistration } from "../models/DeviceRegistration"
import type { AdminAttendanceDashboardResponse } from "../models/AdminAttendanceDashboardResponse"
import type { FingerprintEnrollmentDTO } from "../dto/FingerprintEnrollmentDto"
import type { FingerprintEnrollment } from "../models/FingerprintEnrollment"
import type { DeviceHealthResponse } from "../models/DeviceHealthResponse"
import type { AttendanceDisputeDto } from "../dto/AttendanceDisputeDto"
import type { AttendanceDispute } from "../models/AttendanceDispute"
import type { AdminDisputeReviewResponse } from "../models/AdminDisputeReviewResponse"
import type { AdminDisputeReviewDto } from "../dto/AdminDisputeReviewDto"
import type { DeviceActivationDto } from "../dto/DeviceActivationDto"
import type { DeviceActivation } from "../models/DeviceActivation"


const Base_URL = "http://127.0.0.1:8000/api/" 



export const FingerPrintIngest = async (payload:FingerprintPayloadDto) : Promise<ApiIngestResponse> => {
    try {
        const response = await axios.post<ApiIngestResponse>(`${Base_URL}/fingerprint`,payload , Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error taking finger print:${String(error)}`);  
    }
    
} 

export const MonthlyReport = async (
  params: MonthlyReportParams
): Promise<ApiResponse<MonthlyAttendanceReport>> => {
  try {
    const response = await axios.get<ApiResponse<MonthlyAttendanceReport>>(
      `${Base_URL}/report/monthly`,
      {
        ...Auth_Header(),
        params: {
          user_id: params.user_id,
          month: params.month,
          year: params.year,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(`Error fetching monthly attendance report:${String(error)}`)
  }
}


export const RegisterDevice = async (payload:DeviceRegistrationDto) : Promise<DeviceRegistration> => {
    try {
        const response = await axios.post<DeviceRegistration>(`${Base_URL}/register/device`, payload,Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error registering device:${String(error)}`); 
    }  
}


export const DashBoard = async ():Promise<ApiResponse<AdminAttendanceDashboardResponse>>  => {
    try {
        const response = await axios.get<ApiResponse<AdminAttendanceDashboardResponse>>(`${Base_URL}/admin/dashboard`, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error fetching all dashboard details:${String(error)}`);   
    }   
}


export const DashBoardChart = async () : Promise<DailyAttendanceTrend> => {
    try {
        const response = await axios.get<DailyAttendanceTrend>(`${Base_URL}/admin/charts/`, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error fetching chart statistic:${String(error)}`);    
    } 
}


export const FingerPrintEnroll = async (payload:FingerprintEnrollmentDTO):Promise<FingerprintEnrollment> => {
    try {
        const response = await axios.post<FingerprintEnrollment>(`${Base_URL}/fingerprint/enroll`,payload, Auth_Header())
        const data = response.data
        return data    
    } catch (error) {
        throw new Error("error in finger print enrollment"); 
    }
    
}


export const AttendanceExport_CSV = async (): Promise<void> => {
  try {
    const response = await axios.get(
      `${Base_URL}/admin/export/attendance/csv`,
      {
        ...Auth_Header(),
        responseType: "blob",
      }
    )

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "text/csv" })
    )

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "attendance.csv")
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    throw new Error(`Error exporting attendance record: ${String(error)}`)
  }
}


export const AttendanceExport_Excel = async (): Promise<void> => {
  try {
    const response = await axios.get(
      `${Base_URL}/admin/export/attendance/excel`,
      {
        ...Auth_Header(),
        responseType: "blob",
      }
    )

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "attendance.xlsx"

    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    throw new Error(`Error exporting attendance to Excel: ${String(error)}`)
  }
}


export const DeviceHealth = async (): Promise<DeviceHealthResponse> => {
    try {
        const response = await axios.get<DeviceHealthResponse>(`${Base_URL}/admin/devices/health`, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error in device health check:${String(error)}`);
    }
    
}


export const AttendanceDisputeCreate = async (payload:AttendanceDisputeDto, log_id:number):Promise<AttendanceDispute> => {
    try {
        const response = await axios.post<AttendanceDispute>(`${Base_URL}/attendance/logs/<int:${log_id}>/dispute`,payload ,Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error creating dispute:${String(error)}`);   
    }
    
} 

export const AdminDisputeReview = async (
  disputeId: number,
  params: AdminDisputeReviewDto
): Promise<AdminDisputeReviewResponse> => {
  try {
    const response = await axios.post<AdminDisputeReviewResponse>(
      `${Base_URL}/admin/attendance/disputes/${disputeId}/review`,
      params,
      Auth_Header()
    );

    const data = response.data;
    return data
  } catch (error) {
    throw new Error(`error in reviewing dispute: ${String(error)}`);
  }
};


export const AdminDeviceActivation = async (payload:DeviceActivationDto):Promise<DeviceActivation> => {
    try {
        const response = await axios.post<DeviceActivation>(`${Base_URL}/device/activate`, payload, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error in activating device:${error}`);
    }
    
}





