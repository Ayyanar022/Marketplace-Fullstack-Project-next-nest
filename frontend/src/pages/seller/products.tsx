import { getProducts } from '@/api/productApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import { Product } from '@/types/product'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Products = () => {

  useProtectedRoute(['SELLER'])

  const [products,setProducts] = useState<Product[]>([])
  const [loading,setloading] = useState(false);

  useEffect(()=>{
    const   handleGetProduct = async()=> {
      try{
              const data = await getProducts()
              setProducts(data)
      }catch(e){
        toast.error(("Failed to load Products"));        
      }finally{
        setloading(false)
      }
    }
    handleGetProduct()
  },[])


  if(loading){
    return <div className='w-full h-full flex  justify-center items-center '>
      <h1>Loading Products ...</h1>
    </div>
  }


  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>My Producrs</h1>
      {products.length===0?(
        <p className='text-textSecondary'>No Prodcuts added yet</p>
      ):(
        <div>
          {products.map((p)=>(
            <div key={p.id} className='bg-cardBg border rounded 
            p-4 flex justify-between items-center'>
              <div>
                <h2 className='font-medium'>{p.name}</h2>
                <p className='text-sm text-textSecondary'>₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Products.getLayout = function getLayout(page:ReactElement){
  return <SellerLayout>{page}</SellerLayout>
}

export default Products
