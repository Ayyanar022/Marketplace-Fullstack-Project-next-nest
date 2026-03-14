import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-text text-[#d1d5db] mt-auto'>
      <div className='w-full my-auto px-12 py-10 grid grid-cols-[1fr,1fr] gap-10'>
          <div>
            <span className='text-xl font-[800] text-white block mb-2'>🛒 MarketPlace</span>
            <p className='text-[#9ca3af] text-sm'>Fresh groceries  delivered to your door.</p>
          </div>
          <div className='flex flex-col md:flex-row gap-4 lg:gap-16 justify-end'>
                <div className="flex flex-col gap-2">
                    <h4 className='text-white text-sm font-[700] uppercase tracking-wide mb-1'>Shop</h4>
                    <a href="#" className='text-slate-400'>Fruits & Vegetables</a>
                    <a href="#" className='text-slate-400'>Dairy & Eggs</a>
                    <a href="#" className='text-slate-400'>Meat & Seafood</a>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className='text-white text-sm font-[700] uppercase tracking-wide mb-1'>Support</h4>
                    <a href="#" className='text-slate-400'>Help Center</a>
                    <a href="#" className='text-slate-400'>Contact Us</a>
                    <a href="#" className='text-slate-400'>Returns</a>
                </div>
          </div>

      </div>
      <div className=''>

      </div>      
    </footer>
  )
}

export default Footer
