import { placeOrder } from "@/api/orderApi";
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import PublicLayout from "@/layouts/PublicLayout";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";





const CheckoutPage = () => {
    useProtectedRoute(['CUSTOMER']);

    const router = useRouter()
    const [loading,setLoading] = useState(false);

    const handlePlaceOrder = async()=>{
        setLoading(false);
        try{
            await placeOrder();
            toast.success("Order placed successfully")
            router.push("/user/orders")

        }catch(e){
            toast.error("Failed to place order")
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
        <div className="border rounded p-4 mb-6">
            <p>Payment Method: <strong>Cash on Delivery</strong></p>
        </div>      

        <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded disabled:opacity-60"
        >
            {loading ? "placing order ..":"Place Order"}
        </button>
    </div>
  )
}

CheckoutPage.getLayout = function getLayout(page:ReactElement){
    return <PublicLayout>{page}</PublicLayout>
}

export default CheckoutPage
