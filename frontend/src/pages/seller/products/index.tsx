import { getProducts, getSellerProducts } from '@/api/productApi'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import SellerLayout from '@/layouts/SellerLayout'
import { Product } from '@/types/product'
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Products = () => {

  useProtectedRoute(['SELLER'])

  const [products,setProducts] = useState<Product[]>([])
  const [loading,setloading] = useState(true);

  useEffect(()=>{
    const   handleGetProduct = async()=> {
      try{
              const data = await getSellerProducts()
              setProducts(data)
      }catch(e){
        console.log('er',e)
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
            <Link  href={`/seller/products/${p.id}`} key={p.id} className='bg-cardBg border rounded 
            p-4 flex gap-10 items-center'>

              <img src={p?.images[0]?.url} alt=""  className='w-20 h-20'/>

              <div>
                <h2 className='font-medium'>{p.name}</h2>
                <p className='text-sm text-textSecondary'>₹{p.price}</p>
                <p className='text-sm text-textSecondary'>Qty : {p?.stock}</p>
              </div>
            </Link>
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
