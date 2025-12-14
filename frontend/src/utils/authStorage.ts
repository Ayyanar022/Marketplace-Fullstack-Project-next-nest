import { AuthUser } from "@/features/auth/types"


const AUTH_KEY = "marketplace_auth_chan_"

export type PersistedAuth = {
    user : AuthUser;
    token:string;
}

export const saveAuth = (data:PersistedAuth)=>{
    localStorage.setItem(AUTH_KEY , JSON.stringify(data));
}

export const getAuth = ():PersistedAuth |null=>{
    if(typeof window ==="undefined") return null;

    const raw = localStorage.getItem(AUTH_KEY);
    return raw? JSON.parse(raw) :null ;
}

export const clearAuth = ()=>{
    localStorage.removeItem(AUTH_KEY);
};