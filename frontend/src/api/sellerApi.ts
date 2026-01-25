import { Product } from "@/types/product";
import api from "./axios";


export const getAllSeller =async ()=>{
    const res = await api.get('/users/get-all-seller')
    return res.data.data
}


