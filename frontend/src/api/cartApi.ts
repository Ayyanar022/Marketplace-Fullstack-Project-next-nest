import api from "./axios"


// add
export const addToCart = async (
    productId:string,
    quantity=1
)=>{
    const res = await api.post('/cart',{productId,quantity});
    return res.data.data;
}

// get all
export const getCart = async ()=>{
    const res = await api.get('/cart')
    return res.data.data;
}

// update
export const updateCartItemQty = async(
    cartItemId:string,
    quantity:number
)=>{
    const res = await api.patch(`/cart/${cartItemId}`,{quantity});
    return res.data.data;
}

// delete 
export const removeCartItem = async (cartItemId:string)=>{
    await api.delete(`/cart/${cartItemId}`)
}