import { Role } from "@/types/role";

export type UserRole = "USER" | "SELLER" |"ADMIN" ;

export interface AuthUser {
    id:string;
    email:string;
    role:Role;
}

export interface AuthSate{
    isAuthenticated :boolean;
    user:AuthUser | null ;
    accessToken :string | null;
}