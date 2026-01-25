
import { Category } from "@/types/category"
import api from "./axios";


export const getCategories = async ():Promise<Category[]>=>{
    const res = await api.get("/categories");
    return res.data.data;
}

export const createCategory = async (name:string):Promise<Category>=>{
    const res = await api.post("/categories",{name})
    return res.data.data;
}

export const editcategory = async (id:string,data:string)=>{
    const res = await api.put(`/categories/edit-categories/${id}`,{data})
    return res.data.data
}