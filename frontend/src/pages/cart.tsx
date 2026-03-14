import { getCart, removeCartItem, updateCartItemQty } from "@/api/cartApi";
import CartItem from "@/components/common/CartItem";
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import PublicLayout from "@/layouts/PublicLayout";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";




const CartPage = () => {
    // useProtectedRoute(["CUSTOMER"]);

    const [cart,setCart] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const [cartTotal ,setCarttotal] = useState(0)

    useEffect(()=>{
        const fetchCart = async()=>{
            try{
             const data = await getCart()
            setCart(data);
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
        }
        fetchCart();
    },[])


    // update qty
    const handleChangeQty = async(e:any,id:string)=>{
        const qty = +(e.target.value);
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
        return (
        <div className="max-w-[1000px] mx-auto p-20 flex-1 ">
            <div className="text-center ">
                <span className="text-[4rem] block mb-4">🛒</span>
                    <h2 className="text-2xl mb-1 ">Your cart is empty</h2>
                    <p className="mb-8 text-textMuted">Looks like you haven't added any items yet.</p>
                    <Link href="/products" className="bg-primary py-3.5  px-6 rounded-full text-white font-[700]">
                        Start Shopping
                    </Link>

            </div>
        </div>
)
  return (
    <div className="  min-h-screen py-8  w-full ">

<div className=" max-w-full lg:max-w-[1000px] mx-auto  ">


        <div className="flex justify-between items-center mb-8 ">
                <h1 className="text-2xl font-[800]">Shopping Cart</h1>
                <button className="py-2 px-5 rounded-full text-sm bg-transparent text-danger font-[600] border border-danger transition hover:bg-danger hover:text-white" onClick={()=>setCart(null)}>
                    Clear All
                </button>
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-8 items-start">
                <div className="flex flex-col gap-3">
                    {
                        cart?.cartItems?.map((item:any)=>(
                           <CartItem key={item._id} item={item} />
                        ))
                    }
                </div>

                <div className="bg-surface border-border rounded-md p-6 sticky top-[88px]">
                    <h3 className="text-[19px] font-[700] mb-4">
                        Order Summary
                    </h3>
                    <div className="flex justify-between  text-sm mb-3 text-textMuted ">
                        <span>Subtotal ({CartItem.length}) items</span>
                        <span>$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between  text-sm mb-3 text-textMuted ">
                        <span>Delivery</span>
                        <span className="text-primary font-[600]">Free</span>
                    </div>
                    <div className="border-t border-border my-4"></div>
                    <div className=" flex justify-between text-[1.1rem] mb-5 text-text font-[800]  ">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link href={"/checkout"}  className="block w-full p-3 bg-primary text-white rounded-full text-center font-[700] text-[1rem] transition mb-3 hover:bg-primaryDark  shadow-glow">
                     Proceed to Checkout
                    </Link>
                    <Link href={"/"}  className=" block text-center text-sm text-textMuted transition">
                    ← Continue Shopping
                    </Link>
                </div>
        </div>

        </div>

       

    </div>
  )
}

CartPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}

export default CartPage






//  <h1 className="text-2xl font-semibold mb-6">My Cart</h1>
//         <div className="space-y-4">
//             {cart?.cartItems?.map((item:any)=>(
//                 <div key={item.id} 
//                 className=" flex justify-between items-center border p-4 rounded">
//                     <div>
//                         <h2 className="text-sm text-textSecondary">{item.product.name}</h2>
//                         <p className="text-sm text-textSecondary">₹{item.product.price}</p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <input type="number" min={1}
//                         value={item.quantity} 
//                         onChange={(e)=>handleChangeQty(e,item.id)}
//                         className="w-16 border text-center border-black/20 p-1 rounded outline-none"
//                         />
                        
//                         <button className="text-red-500"
//                          onClick={()=>removeItem(item.id)}>
//                             Remove
//                         </button>

//                     </div>

//                 </div>
//             ))}

//         </div>

//         <div className="mt-6 text-right">
//             <p>Total : ₹{total}</p>
//         </div>
//         <Link href="/checkout"
//         className="inline-block mt-8 bg-primary text-white px-6 py-2 rounded"
//         >
//         Proceed to Checkout</Link>
