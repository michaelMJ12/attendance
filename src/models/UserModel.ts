import type { USER_ROLES } from "./RoleModel";

export type UserRole = typeof USER_ROLES[number];


export interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_admin: boolean;
  is_staff: boolean;
  is_student: boolean;
  is_superuser: boolean; 
}

