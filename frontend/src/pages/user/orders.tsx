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
        setOrder(res.data.data)
        console.log('my order --',res.data.data)
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
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-6'>My Orders</h1>

      {orders.length===0?(
        <p className='text-muted'>No order yet</p>
      ):(
        // <div className='space-y-6'>
        //   {orders.map((order:any)=>(


        //     order.items.map((item:any)=>(
        //        <div key={item.id} className='border rounded p-4'>
        //       {/* <p className=''><b>Order ID:</b>{item.id}</p> */}
        //       <p><b>Name:</b>{item.product.name}</p>
        //       <p><b>Status:</b>{item.status}</p>
        //       <p><b>Qunatity:</b>{item.quantity}</p>
        //       <p><b>Price:</b>₹{item.price}</p>
        //       <p><b>Total:</b>₹{item.price * item.quantity}</p>


        //       {order.status==='PENDING' &&(
        //         <button className='' onClick={()=>cancelOrder(item.id)}>
        //           Cancel Order
        //         </button>
        //       ) }

        //     </div>
        //     ))
          
           
        //   ))}
          
        // </div>

        <div className='space-y-6'>
          {
            orders.map((order:any)=>(
              <div key={order.id} className='border rounded-lg p-4 bg-background'>

                {/* Order header (optional , subtle) */}
                <p className='text-sm text-muted mb-4'>
                  Order ID : <span className='break-all'>{order.id}</span>
                </p>

                {/* Order Items */}
                <div className='space-y-4'>
                  {
                    order.items.map((item:any)=>(
                      <div key={item.id}
                      className='flex gap-4 border rounded-lg p-4 bg-white'
                      >
                        {/* Product Image */}
                        <img 
                        src={item.product.iamge?.[0]?.url} 
                        alt={item.product.name}
                        className='w-28 h-28 object-cover rounded-md border'
                        />

                        {/* Content */}
                        <div className='flex-1 flex justify-between items-start'>
                            <div className='space-y-1'>
                              <p className='font-medium'>{item.product.name}</p>

                              <p className='text-sm text-textSecondary'>Qty : {item.quantity}</p>
                              <p className='text-sm text-textSecondary'>Price :₹{item.price}</p>
                              <p className='text-sm text-textSecondary'>Total : ₹{item.price * item.quantity}</p>

                              {/* Status badge */}
                              <span className={`inline-block mut-1 py-0.5 px-2 text-xs font-medium rounded-full  
                                ${
                                  item.status === 'PENDING'
                                  ?'bg-green-100 text-primary border border-green-300'
                                  : item.status === 'PACKED'
                                  ?'bg-yellow-100 text-yellow-700 border border-yellow-400'
                                  :item.status === 'SHIPED'
                                  ? ' bg-blue-100 text-blue-700 border border-blue-300'
                                  :'bg-red-100 text-red-600 border border-red-300'
                                }
                                
                                `}>
                                {item.status}
                              </span>
                            </div>

                            {/* Cancel button */}
                            {item.status === 'PENDING' && (
                              <button  
                              onClick={()=>cancelOrder(item.id)}
                              className='px-4 py-1.5 text-sm rounded-md bg-accent text-white hover:opacity-90'
                              >
                                Cancel
                              </button>
                            )}
                        </div>


                      </div>
                    ))
                  }

                </div>



              </div>
            ))
          }

        </div>
      )}
    </div>
  )
}

Orders.getLayout = function getLayout(page:ReactElement){
  return <UserLayout>{page}</UserLayout>
}
export default Orders
