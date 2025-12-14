import { Role } from "@/types/role";

export type UserRole = "CUSTOMER" | "SELLER" |"ADMIN" ;

export interface AuthUser {
    id:string;
    name:string;
    email:string;
    role:Role;
}

export interface AuthSate{
    isAuthenticated :boolean;
    user:AuthUser | null ;
    accessToken :string | null;
    authChecked:boolean ;
}