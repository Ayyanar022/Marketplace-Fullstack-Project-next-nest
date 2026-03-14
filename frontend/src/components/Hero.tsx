import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='w-full mx-auto flex flex-col md:flex-row items-center justify-between p-10 '>
        <div className='flex-1 max-w-[660px]'>
            <div className='inline-block bg-primaryLight text-primaryDark text-sm px-4 py-2 rounded-full font-[600] mb-5'>🌿 Fresh & Organic</div>
               <h1 className="text-5xl font-[800] mb-5 tracking-wide leading-tight">
                    Farm-Fresh <span className="bg-gradient-to-br from-primary to-[#059669] bg-clip-text text-transparent">Groceries</span> Delivered to
                    Your Door
                </h1>
                 <p className="text-textMuted mb-8 text-lg max-w-[480px]">
                    Shop premium quality fruits, vegetables, dairy, and more — all sourced
                    from local farms and delivered fresh.
                </p>
                    <div className="flex gap-4 mb-10">
                    <Link href={'/product'} className="px-7 py-3 rounded-full font-[600] transition-all duration-300 ease-in-out primary bg-primary text-white shadow-[0_4px_14px_rgba(22,163,74,0.35)] hover:bg-primaryDark hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(22,163,74,0.4)">
                        Shop Now
                    </Link>
                    <Link href={'/cart'} className="px-7 py-3 rounded-full font-[600] transition-all duration-300 ease-in-out bg-surface text-text border-[1.5px] border-border hover:border-primary hover:text-primary">
                        View Cart
                    </Link>
                </div>
                  <div className="flex gap-10 ">
                    <div className="flex flex-col">
                        <span className="text-2xl text-slate-700 font-[800]">200+</span>
                        <span className="text-sm text-textMuted">Products</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl text-slate-700 font-[800]">50k+</span>
                        <span className="text-sm text-textMuted">Customers</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl text-slate-700 font-[800]">4.9</span>
                        <span className="text-sm text-textMuted">Rating</span>
                    </div>
                </div>
        </div>
        <div></div>
    </section>
  )
}

export default Hero
