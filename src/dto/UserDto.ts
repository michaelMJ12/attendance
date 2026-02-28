import type { UserRole } from "../models/UserModel";

export interface UserDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: UserRole;
}


