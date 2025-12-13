// import { RootState } from '@reduxjs/toolkit/query';
import { logout } from "@/features/auth/authSlice";
import { RootState } from "@/features/store";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  const dispatch = useDispatch();
  const {isAuthenticated ,user}  = useSelector( (state:RootState)=>state.auth);


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
            <span className='text-textSecondary'> {user?.email}</span>
            <button className="text-red-500 hover:underline" onClick={()=>dispatch(logout())}>Logout</button>
            </>
          )}
        </nav>
      </div>      
    </header>
  )
}

export default Navbar
