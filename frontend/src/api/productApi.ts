import { Product } from "@/types/product";
import api from "./axios";


// for seller
export const getProducts = async():Promise<Product[]>=>{
    const res = await api.get('/products');    
    return res.data.data;
}

export const getProductById = async(id:string)=>{
    const res = await api.get(`/products/${id}`);
    return res.data.data
}




// seller page --------------
export const createProduct = async(
    payload:{
        name:string;
        description?:string;
        categoryId:string;
        price:number;
        stock:number;
        imageUrl:string[];
    }
):Promise<Product>=>{

        const res = await api.post('/products',payload);
        return res.data.data;
}


// seller product
export const getSellerProducts = async():Promise<Product[]>=>{
    const res = await api.get('/products/seller-getproduct')
    // console.log("res----234",res)
    return res.data.data ;
}


// product view
export const getSellerProductById = async(id:string):Promise<Product>=>{
    const res = await api.get(`/products/seller-getproduct/${id}`)
    return res.data.data;
}

// update Product
export const updateProduct = async(id:string,    payload:Partial<{
        name:string;
        description?:string;
        price:number;
        categoryId:string;
        stock:number;
        imageUrl?:string[];
    }>
):Promise<Product>=>{
    const res = await api.patch(`/products/${id}`,payload);
    return res.data.data;
}


export const deleteProduct = async(id:string)=>{
    await api.delete(`/products/${id}`)
}

export const deleteImage = async(id:string)=>{
    await api.delete(`/products/image/${id}`)
}
