import { getCart, removeCartItem, updateCartItemQty } from "@/api/cartApi";
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import PublicLayout from "@/layouts/PublicLayout";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";




const CartPage = () => {
    useProtectedRoute(["CUSTOMER"]);

    const [cart,setCart] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchCart = async()=>{
            try{
             const data = await getCart()
            setCart(data);
            }catch(e){
                toast.error("Failed to load cart");
            }finally{
                setLoading(false)
            }
        }
        fetchCart();
    },[])

    console.log("cart---",cart)

    // update qty
    const handleChangeQty = async(e:any,id:string)=>{
        const qty = +(e.target.value);
        console.log("qty---",qty)
        try{
            await updateCartItemQty(id,qty );
            const data = await getCart() ;
            setCart(data)            
        }catch(e){
            console.log(e)
            toast.error("Failed to update quantity");
        }
    }

    // delete item
    const removeItem = async(id:string)=>{
        try{
            await removeCartItem(id);   
            const data = await getCart()
            setCart(data);        
        }catch(e){
            toast.error("Failed to remove item");
        }
    }

    // total 
    const total = cart?.cartItems?.reduce((sum:number ,item:any)=> sum + (item.product.price *  item.quantity ),0)


    if(loading) return <p className="text-center">Loading Cart..</p>
    if(!cart || cart?.cartItems?.length===0)
        return <p className="text-center">Your Cart is Empty</p>
    console.log("cart---",cart)

  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Cart</h1>
        <div className="space-y-4">
            {cart?.cartItems?.map((item:any)=>(
                <div key={item.id} 
                className=" flex justify-between items-center border p-4 rounded">
                    <div>
                        <h2 className="text-sm text-textSecondary">{item.product.name}</h2>
                        <p className="text-sm text-textSecondary">₹{item.product.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="number" min={1}
                        value={item.quantity} 
                        onChange={(e)=>handleChangeQty(e,item.id)}
                        className="w-16 border border-black/20 p-1 rounded outline-none"
                        />
                        
                        <button className="text-red-500"
                         onClick={()=>removeItem(item.id)}>
                            Remove
                        </button>

                    </div>

                </div>
            ))}

        </div>

        <div className="mt-6 text-right">
            <p>Total : ₹{total}</p>
        </div>


    </div>
  )
}

CartPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}

export default CartPage
