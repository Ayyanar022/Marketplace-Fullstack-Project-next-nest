import api from "./axios"


export const dashbordCount = async()=>{
    const res = await api.get('/admin/dashbord-count');
    return res.data.data;
}