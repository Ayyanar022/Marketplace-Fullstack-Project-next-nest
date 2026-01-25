import { getProducts } from '@/api/productApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement, useEffect, useState } from 'react'

const Products = () => {

  useProtectedRoute(['ADMIN'])

  const [products,setProducts] = useState([])




  useEffect(()=>{
    const fetchProduct = async()=>{
      try{
        const res:any = await getProducts()
        setProducts(res)

      }catch(e){

      }
    }

    fetchProduct()

  },[])

  return (
    <div>
      <h2 className='text-lg font-medium pb-2'>Products</h2>

      <section className='flex flex-col space-y-5  rounded-md  max-w-2xl'>
       {
        products?.map((m:any)=>(

        <div key={m.id} className='p-4 flex justify-between items-start bg-slate-200/40 rounded-md'>
          <div className='flex  gap-6'>          
          <img src={m.images[0]?.url} alt="" className='w-20 h-20 object-contain' />
          <div className=' flex flex-col space-y-1'>
            <span className='text-xs text-textSecondary'>seller ID:{m.sellerId}</span>
            <span className='text-sm '>name : {m?.name}</span>
            {/* <span className='text-sm '>Price</span> */}
            <span className='text-sm text-textSecondary'>stock : {m.stock}</span>
            {
              m.isActive ? 
              ( <span className='text-xs text-primary '>Active</span>)
              :
              ( <span className='text-xs text-red-400'>InActive</span>)
            }
           

          </div>
           </div>

            <button className=' py-1.5 px-4 inline-flex rounded-md text-white text-sm bg-primary justify-center items-center'>View</button>

          
        </div>
        ))
       }
      </section>


    </div>
  )
}

Products.getLayout = function getLayout(page:ReactElement){
  return <AdminLayout>{page}</AdminLayout>
}

export default Products
