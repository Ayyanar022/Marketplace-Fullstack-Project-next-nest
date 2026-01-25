import { getAllSeller } from '@/api/sellerApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement, useEffect, useState } from 'react'

const Sellers = () => {
  useProtectedRoute(['ADMIN'])

  const [ sellers,setSellers] = useState([]);

  useEffect(()=>{
    const getSeller = async()=>{
      try{
        const res = await getAllSeller();
        setSellers(res)

      }catch(e){

      }
    }
    getSeller()
  },[])

  return (
    <div>
      <h3 className='text-lg font-medium pb-2'>Sellers</h3>
      <section className='space-y-4 shadow-md max-w-2xl'>
        {sellers?.map((s:any)=>(
          <div className='flex flex-col bg-slate-200/60 p-4 rounded-lg'>
            <span className='text-xs text-textSecondary'>Seller Id :{s.id}</span>
            <span className='text-sm text-textSecondary '>name : {s.name}</span>
            <span className='text-sm text-textSecondary'>product count :<span className='font-semibold text-slate-500 ml-1'>{s.products.length}</span></span>
            <div className='mt-2 flex gap-x-5 items-center'>
                  {s.isActive? 
                  (<span className='text-xs text-green-600'>Active</span>)
                  :
                  (<span className='text-xs text-red-400'>InActive</span>)   }    

                  <button className=' text-xs rounded-full shadow-md hover:shadow-lg bg-slate-200 text-slate-600 py-1 px-2'>View</button>        
              </div>
          </div>
        ))}

      </section>
    </div>
  )
}

Sellers.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Sellers
