import api from "./axios"


export const placeOrder = async ()=>{
    const res = await api.post('/order');
    // console.log("orders -----",res)
    return res.data.data;
}


// update orderItem status
export const updateOrderItemStatus = async(
    orderItemId:string,
    status :'PACKED' | 'SHIPPED'
)=>{
    const res = await api.patch(`/order/seller/order-items/${orderItemId}/status`,{status});
    return res.data.data;
}


// cancel order - user 
export const cancel_Order = async(id:string)=>{
    const res = await api.patch(`/order/user/order-items/${id}/cancel-order`)
    return res.data.data ;
}