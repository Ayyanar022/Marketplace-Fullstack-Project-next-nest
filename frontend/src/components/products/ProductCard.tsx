import Image from 'next/image'
import React from 'react'

const ProductCard = ({product}) => {
  return (

    <div className='relative bg-surface rounded-md p-6 border border-border transition 
    flex flex-col hover:border-primary shadow-md -translate-y-2'>
        <div className='w-24 h-24 relative mb-3'>
           <Image 
            className=' object-cover rounded'  
            // src={product?.images?.[0]?.url}
            src={"/img.jpeg"}
            alt={product?.name} 
            fill
            />    
        </div>  
            <span className='absolute top-5 py-0.5 px-3 font-[500] right-5 bg-primaryLight text-primaryDark text-xs rounded-full uppercase tracking-wide'>{product?.category?.name}</span>     
            <span className='text-[17px] font-[700] tracking-normal mb-1.5'>{product?.name}</span>     
            <p className='text-sm text-textMuted mb-1 flex-1 '>{product?.description}</p> 
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='text-lg font-[800] text-primaryDark'>${product?.price.toFixed(2)}</span>
                    <span className='text-sm text-textMuted'>{product?.stock}</span>
                </div>
                <button className='py-1 px-4 rounded-full bg-primary text-white font-[600] text-sm transition hover:bg-primaryDark scale-105'>
                    {"Add"}
                </button>
            </div>
        
        

    </div>
  )
}

export default ProductCard
