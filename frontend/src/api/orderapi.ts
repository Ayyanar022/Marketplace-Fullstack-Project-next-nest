import api from "./axios"


export const placeOrder = async ()=>{
    const res = await api.post('/order');
    return res.data
}

// export const getUserOrder = async ()=>{
//     const res = await api.get('/order');
//     return res.data
// }


// update orderItem status
export const updateOrderItemStatus = async(
    orderItemId:string,
    status :'PACKED' | 'SHIPPED'
)=>{
    const res = await api.patch(`/order/seller/order-items/${orderItemId}/status`,{status});
    return res.data;
}


// cancel order - user 
export const cancel_Order = async(id:string)=>{
    const res = await api.patch(`/order/user/order-items/${id}/cancel-order`)
    return res.data ;
}