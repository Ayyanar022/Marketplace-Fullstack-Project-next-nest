import { useRouter } from "next/router"
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useEffect } from "react";


export const useProtectedRoute = ( allowRoles : ("CUSTOMER" |'SELLER'| 'ADMIN')[])=>{
   
    const router= useRouter();
    const {isAuthenticated ,user ,authChecked}  = useSelector((state:RootState)=>state.auth);

    useEffect(()=>{
        if(!router.isReady)return // wait for router
        if(!authChecked) return // wait for auth
        if(!isAuthenticated){
            router.replace('/login');
            return;
        }
        
        if(user && !allowRoles.includes(user.role)){
            router.replace('/')
        }

    },[
        router.isReady,
        authChecked,
        isAuthenticated,
        user,
        allowRoles,
        router])
};

