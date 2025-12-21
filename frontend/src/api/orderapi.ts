import api from "./axios"


export const placeOrder = async ()=>{
    const res = await api.post('/order');
    return res.data
}