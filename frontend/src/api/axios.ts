
import { clearAuth, getAuth } from "@/utils/authStorage";
import axios from "axios";
import { error } from "console";


const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
})

// attch token 
api.interceptors.request.use(
    (config)=>{
        const auth = getAuth();
        if(auth?.token){
            config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config
    },
    (error)=>Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response?.this?.state ===401){
            clearAuth();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api