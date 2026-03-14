import React from 'react'

const CartItem = ({item}:any) => {
    console.log("item",item)
  return (
    <div className='flex items-center gap-4 bg-surface border  border-border rounded-md py-4 px-5 transition hover:text-primary'>
         <div className="text-[2rem] flex-shrink-0">🍊</div>
        <div className='flex-1 min-w-0'>
            <h3 className='text-[0.95rem] font-[700] truncate'>{item?.product?.name}</h3>
            <p className='text-sm text-textMuted'>{item?.product?.price?.toFixed(2)}{item?.stock}</p>
        </div>

        <div className='flex items-center gap-4 flex-shrink-0'>
                <div className='flex items-center gap-0 border border-border rounded-sm overflow-hidden'>
                    <button className='w-8 h-8 bg-bg inline-flex items-center justify-center text-text text-[1rem] font-[600]  transition  hover:bg-primaryLight hover:text-primary'>
                        -
                    </button>
                    <span className='w-9 text-center font-[700] '>
                       {item?.quantity ||0}
                    </span>
                    <button className='w-8 h-8 bg-bg text-text text-[1rem] font-[600] inline-flex items-center justify-center transition  hover:bg-primaryLight hover:text-primary'>
                         +
                    </button>

                </div>

                     <span className='text-sm font-[700] min-w-[60px] text-right'>
                    $ {((item?.product?.price || 0) * item?.quantity).toFixed(2)}
                    </span>

                    <button className='bg-transparent text-textMuted text-sm p-1.5 rounded-full transition w-7 h-7 inline-flex items-center justify-center hover:bg-[#fef2f2]  hover:text-danger'>
                         ✕
                    </button>

        </div>

      
    </div>
  )
}

export default CartItem
