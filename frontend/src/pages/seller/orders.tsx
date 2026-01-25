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
      .then((res)=>{setOrders(res.data.data);
        console.log("seller order " ,res.data)
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

  console.log("orders seller",orders)

  if(loading) return <p>Loading orders...</p>

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-6'>Orders to Fulfill</h1>

      {orders.length===0?(
        <p className='text-gray-500'> No order yet</p>
            ):(
              <div className='space-y-6'>
              {orders?.map(order => (
        <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm ">
         
         {/* {order headder} */}
         <div className='mb-4'>
                <p className='text-sm text-gray-500'>Order ID</p>
                <p className='font-medium break-all'>{order.id}</p>
         </div>
         
          {/* <p><b>Status:</b> {order.status}</p> */}

          {/* Order Items */}
          <div className='space-y-4'>
          {order.items.map((item:any) => (
            <div key={item.id} className="flex justify-between items-start border rounded-lg p-4 bg-gray-50">
            
            {/* Left */}
            <div className='space-y-1 flex gap-10 items-center'>
              <div className='h-16 w-32'>
                <img src={item.product.images?.[0]?.url} alt=""  className='w-full  h-full object-contain'/>
              </div>

              <div>
              <p className='font-medium'>{item.product.name}</p>
              <p className='text-sm text-gray-600'> Qty:{item.quantity}</p>
              <p className='text-sm text-gray-600'>Total: ₹{item.price * item.quantity}</p>
             
              

            {/* Status batch */}
              <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full 
                ${
                  item.status ==='PENDING'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  :item.status ==='PACKED'
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  :item.status === 'SHIPPED'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  :'bg-gray-100 text-gray-700 border border-gray-300'
                }
                
                `}>{item.status}</span>

            </div>
            </div>


            {/* Right side - Action */}

             <div>
                
            {item.status==='PENDING' && (
              <button className=' px-4 py-1.5 text-sm rounded-md 
              bg-blue-600 text-white hover:bg-blue-700'
               onClick={()=>handleStatusUpdate(item.id,'PACKED')}>
                 Mark as Packed
              </button>
            )}

             { item.status==='PACKED' && (
              <button className='px-4 py-1.5 text-sm rounded-md 
              bg-green-600 text-white hover:bg-green-700'
              onClick={()=>handleStatusUpdate(item.id,'SHIPPED')}>
                 Mark as Shipped
              </button>
            ) }
              </div>         

        

           
            </div>
          ))}
          </div>
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
