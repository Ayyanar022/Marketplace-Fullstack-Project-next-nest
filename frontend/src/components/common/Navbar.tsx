// import { RootState } from '@reduxjs/toolkit/query';
import { logout } from "@/features/auth/authSlice";
import { RootState } from "@/features/store";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  const router = useRouter()

  const dispatch = useDispatch();
  const {isAuthenticated ,user}  = useSelector( (state:RootState)=>state.auth);

  const handleLogout = ()=>{
    dispatch(logout())
    router.replace('/products')  // to navigate public product page 
  }

  return (
    <header className='bg-cardBg border-b border-accent/10'>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center
      justify-between">
        <Link href='/' className='font-semibold text-primary'>
          MarketPlace
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {!isAuthenticated ?(
            <>
            <Link href="/login" className='hover:text-primary'> Login </Link>
            <Link href="/signup" className="hover:text-primary" >SignUp</Link>
            </>
          ):(
            <>
            <span className='text-textSecondary text-base capitalize'> {user?.name}</span>
            <button className="text-red-500 hover:underline" onClick={handleLogout}>Logout</button>
            </>
          )}

          {isAuthenticated && user?.role==="CUSTOMER" && (
            <Link href='/cart' className="px-4 py-2 rounded border text-sm hover:bg-gray-100">Cart</Link>
          ) }
        </nav>
      </div>      
    </header>
  )
}

export default Navbar
