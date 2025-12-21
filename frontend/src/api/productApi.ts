import { Product } from "@/types/product";
import api from "./axios";


export const createProduct = async(
    payload:{
        name:string;
        description?:string;
        price:number;
        // imageUrl:string;
        categoryId:string;
    }
):Promise<Product>=>{

        const res = await api.post('/products',payload);
        return res.data;
}


export const getProducts = async():Promise<Product[]>=>{
    const res = await api.get('/products');    
    return res.data
}

export const getProductById = async(id:string)=>{
    const res = await api.get(`/products/${id}`);
    return res.data
}