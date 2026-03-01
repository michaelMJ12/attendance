import type { AuthDto } from "../dto/AuthDto"
import type { Auth } from "../models/AuthModel"
import axios, { type AxiosRequestConfig } from "axios";
import type { User } from "../models/UserModel";
import type { UserDto } from "../dto/UserDto";
import type { RefreshAuthDto } from "../dto/RefreshDto";
import type { RefreshAuth } from "../models/RefreshModel";
import type { ApiResponse, DeleteApiResponse,  LogoutApiResponse,  PaginatedResponse } from "../models/ApiResponse";




const Auth_URL = "https://back-end-near.onrender.com/api/aut"


const token = localStorage.getItem("get_token")



export const Auth_Header = () : AxiosRequestConfig =>({
    headers:{
        Authorization:`Bearer${token}`,
        "Content-Type":"application/json",
    }
})




export const SignUp = async (payload:UserDto) : Promise<ApiResponse<User>> => {
    try {
        const response = await axios.post<ApiResponse<User>>(`${Auth_URL}/signup`, payload, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error in sign_in:${String(error)}`)
    }
}


export const AuthLogin = async (payload:AuthDto) : Promise<Auth> =>{
    try{
        const response = await axios.post<Auth>(`${Auth_URL}/login`, payload)
        const data = response.data
        const access_token =  data.access
        const refresh_token = data.refresh
        localStorage.setItem("refresh", refresh_token)
        localStorage.setItem("get_token", access_token)
        
        return data
    }catch(e){
        throw new Error(`error in login:${String(e)}`)
    }
}



export const Auth_Refresh = async (payload:RefreshAuthDto) : Promise<RefreshAuth> => {
    try {
        const response = await axios.post<RefreshAuth>(`${Auth_URL}/refresh`, payload, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error in refresh user auth :${String(error)}`);
    }
}


export const Logout = async (): Promise<LogoutApiResponse> => {
    try {
        const access = localStorage.getItem("get_token");
        const refresh = localStorage.getItem("refresh");

        if (!access || !refresh) {
            throw new Error("Tokens missing");
        }

        const logout_response = await axios.post<LogoutApiResponse>(
            `${Auth_URL}/logout`,
            { refresh }, 
            {
                headers: {
                    Authorization: `Bearer ${access}`, 
                    "Content-Type": "application/json"
                }
            }
        );

        return logout_response.data;

    } catch (error) {
        throw new Error(`error in logout: ${String(error)}`);
    }
};



export const GetSignUp = async (): Promise<PaginatedResponse<User>> => {
     try {
        const response = await axios.get<PaginatedResponse<User>>(`${Auth_URL}/signup`, Auth_Header())
        const data = response.data
        return data 
     } catch (error) {
        throw new Error(`error in fetching user: ${String(error)}`);
     }
}


export const GetSignUpById = async (id:number) : Promise<ApiResponse<User>> => {
    try {
        const response = await axios.get<ApiResponse<User>>(`${Auth_URL}/signup/${id}`, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error : ${String(error)} : fetching user with id:${id}`);
    }

}


export const UpdateUserById = async (payload:UserDto, id:number) : Promise<ApiResponse<User>> => {
    try {
        const response = await axios.put<ApiResponse<User>>(`${Auth_URL}/signup/${id}`, payload, Auth_Header())
        const data = response.data
        return data
    } catch (error) {
        throw new Error(`error updating user:${String(error)}`);  
    }
    
}


export const DeleteUserById = async (id:number):Promise<DeleteApiResponse> => {
      try {
        const response = await axios.delete<DeleteApiResponse>(`${Auth_URL}/signup/${id}`, Auth_Header())
        const data = response.data
        return data 
      } catch (error) {
        throw new Error(`error :${String(error)} deleting user with id:${id}`);  
      }
    
}


export const UserProfile = async ():Promise<ApiResponse<User>> => {
    try {
        const response = await axios.get<ApiResponse<User>>(`${Auth_URL}/profile`, Auth_Header())
        const data = response.data
        return data   
    } catch (error) {
        throw new Error(`error in user profile:${String(error)}`);    
    }
    
}






