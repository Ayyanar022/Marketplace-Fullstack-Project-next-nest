// import { RootState } from '@reduxjs/toolkit/query';
import { logout } from "@/features/auth/authSlice";
import { RootState } from "@/features/store";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  let [cartCount ,setCartcount] = useState(0)

  const router = useRouter()
  // const location = useLocation()
  const currentPath = router.pathname;

  const dispatch = useDispatch();
  const {isAuthenticated ,user}  = useSelector( (state:RootState)=>state.auth);

  const handleLogout = ()=>{
    dispatch(logout())
    router.replace('/products')  // to navigate public product page 
  }

  return (
    <header className='sticky top-0 z-50 bg-white/40 border-b border-border  backdrop-blur-lg '>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center
      justify-between"> 
        <Link href='/' className=' flex items-center gap-2 font-[800] text-[1.3rem] text-primary'>
          <span className="text-[1.5rem]">🛒</span>
          <span className=""> MarketPlace</span>
         
        </Link>

        <nav className="flex gap-3">
          <Link href='/' className={`nav-link ${currentPath ==='/' ? "active":""}`}>Home</Link>
          <Link href='/products' className={`nav-link  ${currentPath ==='/products' ? "active":""}`}>Products</Link>
         
          <Link href='/cart' className={`nav-link  cart-link ${currentPath ==='/cart' ? "active":""}`}>
          <span className="">🛍️</span>
          Cart
          {cartCount >0 && <span className={`bg-primary text-white text-[0.7rem] font-[700] min-w-5 rounded-xl flex items-center justify-center px-1.5 animate-badgePop ${currentPath ==='/cart' ? "text-primary bg-primaryLight":""}`}          > {cartCount}</span>}
          </Link>
        </nav>

        <nav className="flex items-center gap-3 text-sm">
        

          {!isAuthenticated ?(
          
           <Link href="/login" className={`nav-link flex items-center gap-1.5 ${currentPath ==='/cart' ? "active":""}`}   >
            <span className="login-icon">👤</span> Sign In 
             </Link>
       
          ):(
            <>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-[#059669] text-white font-[700] text-xl capitalize  flex justify-center items-center">{user?.name?.charAt(0)}</div>
            <Link href={'/user/orders'} className='text-textSecondary text-base capitalize font-[700] text-[0.88rem] max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap'> {user?.name}</Link>
            <button className="  py-1 px-3 rounded-full bg-transparent text-danger text-[0.78rem] border border-danger font-[600] transition hover:bg-danger hover:text-white" onClick={handleLogout}>Logout</button>
            </>
          )}

     
        </nav>
      </div>  


    
    </header>
  )
}

export default Navbar
