import api from '@/api/axios'
import { cancel_Order, getUserOrder } from '@/api/orderApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import UserLayout from '@/layouts/UserLayout'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Orders = () => {

  useProtectedRoute(['CUSTOMER'])

  const [orders,setOrder] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  const fetchMyOrder = ()=>{
     api.get('/order/my')
      .then(res=>{
        setOrder(res.data)
        // console.log('my order --',res.data)
      })
      .finally(()=>setLoading(false))
  }
  useEffect(()=>{
   fetchMyOrder()
  },[])


  const cancelOrder =async (id:string)=>{
    try{
      await cancel_Order(id);
      fetchMyOrder()
      toast.success("Order Cancelled")
    }catch(e){
      toast.error("Failed to cancel order")
    }
  }

  if(loading)return <p>Loading orfers...</p>

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>My Orders</h1>

      {orders.length===0?(
        <p>No order yet</p>
      ):(
        <div className='space-y-4'>
          {orders.map((order)=>(

            order.items.map((item:any)=>(
               <div key={item.id} className='border rounded p-4'>
              {/* <p className=''><b>Order ID:</b>{item.id}</p> */}
              <p><b>Name:</b>{item.product.name}</p>
              <p><b>Status:</b>{item.status}</p>
              <p><b>Qunatity:</b>{item.quantity}</p>
              <p><b>Price:</b>₹{item.price}</p>
              <p><b>Total:</b>₹{item.price * item.quantity}</p>


              {order.status==='PENDING' &&(
                <button className='' onClick={()=>cancelOrder(item.id)}>
                  Cancel Order
                </button>
              ) }

            </div>
            ))
          
           
          ))}
          
        </div>
      )}
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}
export default Orders
