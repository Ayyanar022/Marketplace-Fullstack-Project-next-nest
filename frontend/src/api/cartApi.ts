import api from "./axios"


// add
export const addToCart = async (
    productId:string,
    quantity=1
)=>{
    console.log("")
    const res = await api.post('/cart',{productId,quantity});
    return res.data;
}

// get all
export const getCart = async ()=>{
    const res = await api.get('/cart')
    return res.data
}

// update
export const updateCartItemQty = async(
    cartItemId:string,
    quantity:number
)=>{
    console.log(" cart ",quantity)
    const res = await api.patch(`/cart/${cartItemId}`,{quantity});
    return res.data;
}

// delete 
export const removeCartItem = async (cartItemId:string)=>{
    await api.delete(`/cart/${cartItemId}`)
}