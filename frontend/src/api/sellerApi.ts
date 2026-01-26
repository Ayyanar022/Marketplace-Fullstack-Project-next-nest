import { Product } from "@/types/product";
import api from "./axios";


export const getAllSeller =async ()=>{
    const res = await api.get('/users/get-all-seller')
    return res.data.data
}

// dashbord apis 
export const dashbordCounts = async ()=>{
    const res = await api.get('/seller/dashbord-counts')
    console.log("dashbord c",res)
    return res.data.data;
}

