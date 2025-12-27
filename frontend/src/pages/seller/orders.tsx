import api from '@/api/axios'
import { updateOrderItemStatus } from '@/api/orderApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Orders = () => {

  useProtectedRoute(['SELLER'])

  const [orders,setOrders] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

const fetchData =()=>{
  api.get("order/seller")
      .then((res)=>{setOrders(res.data);
        // console.log("seller order " ,res.data)
      })
      .catch(()=>toast.error("Failed to load orders"))
      .finally(()=>setLoading(false))
}

  useEffect(()=>{
    fetchData()
  },[])

  // 
  const handleStatusUpdate = async(id:string ,nextstatus:'PACKED' | 'SHIPPED')=>{
    try{
      await updateOrderItemStatus(id,nextstatus)
      toast.success("status updated")
      fetchData();  // reload seller data
    }catch(e){
      toast.error("failed to update")
    }
  }


  if(loading) return <p>Loading orders...</p>

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Orders to Fulfill</h1>

      {orders.length===0?(
        <p>No order yet</p>
            ):(
              <div className='space-y-4'>
              {orders.map(order => (
        <div key={order.id} className="border rounded p-4 ">
          <p><b>Order:</b> {order.id}</p>
          <p><b>Status:</b> {order.status}</p>

          {order.items.map((item:any) => (
            <div key={item.id} className="border p-4 rounded bg-gray-100">
              <p><b>Product:</b> {item.product.name}</p>
              <p><b>Qty:</b> {item.quantity}</p>
              <p><b>Item Total:</b> ₹{item.price * item.quantity}</p>
              <p><b>Status: </b>{item.status}</p>

            {/* update status */}
            {item.status==='PENDING' && (
              <button className='' onClick={()=>handleStatusUpdate(item.id,'PACKED')}>
                 Mark as Packed
              </button>
            )}

            { item.status==='PACKED' && (
              <button className='' onClick={()=>handleStatusUpdate(item.id,'SHIPPED')}>
                 Mark as Shipped
              </button>
            )

            }
            </div>
          ))}
        </div>
      ))}
        </div>
      )}
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default Orders
