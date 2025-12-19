
import { Category } from "@/types/category"
import api from "./axios";


export const getCategories = async ():Promise<Category[]>=>{
    const res = await api.get("/categories");
    return res.data
}

export const createCategory = async (name:string):Promise<Category>=>{
    const res = await api.post("/categories",{name})
    return res.data;
}