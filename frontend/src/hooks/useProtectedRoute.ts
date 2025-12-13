import { useRouter } from "next/router"
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useEffect } from "react";


export const useProtectedRoute = ( allowRoles : ("USER" |'SELLER'| 'ADMIN')[])=>{
   
    const router= useRouter();
    const {isAuthenticated ,user}  = useSelector((state:RootState)=>state.auth);

    useEffect(()=>{
        if(!isAuthenticated){
            router.replace('/login');
            return;
        }

        if(user && !allowRoles.includes(user.role)){
            router.replace('/')
        }

    },[isAuthenticated,user,allowRoles,router])


};

