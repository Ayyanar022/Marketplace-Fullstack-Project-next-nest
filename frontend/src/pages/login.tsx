import { loginApi } from '@/api/authApi';
import { loginSuccess } from '@/features/auth/authSlice';
import PublicLayout from '@/layouts/PublicLayout'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'

const Login = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [email,setEmail] = useState('');
  const[password,setPassword] = useState('')
  const [loading,setLoading] = useState(false);
  const [error ,setError] = useState('');

  const handleSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      setError('');
      setLoading(true);

      try{
        const data = await loginApi(email,password);
        if(data.status===400) return toast.error(data.response.message||"Invalid");
        
       
          // to store current user in store
        dispatch(
          loginSuccess({
            user:data.user,
            token:data.accessToken,
          })
        );

        // redirect by role
        if(data.user.role==='ADMIN') router.push("/admin");
        else if(data.user.role ==='SELLER') router.push("/seller");
        else router.push("/products");

      }catch(e:any){
        console.log(e)
        setError(e.response?.data?.message||"Login failed");
      }finally{
        setLoading(false);
      }
    
  }


  return (

    <div className='w-full md:w-1/2 mx-auto bg-cardBg p-12 rounded-lg  shadow '>
      <h1 className='text-xl font-semibold mb-8 text-center'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 '>
        
        <div className='flex flex-col '>
          <label htmlFor="name" className='text-sm'>User name</label>
        <input type="email" id='name' placeholder='Email' className='border p-2 rounded' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        </div>

        <div  className='flex flex-col '>
          <div className='flex justify-between'>
          <label htmlFor="password" className='text-sm'>Password</label>
          <label htmlFor="password" className='text-sm text-primary'>Forgot Password?</label>
          </div>

        <input type="password" id='password' placeholder='Password' className='border p-2 rounded'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        </div>
      
        <button type='submit' className='bg-primary text-white py-2.5 mt-5   rounded'>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className='text-sm text-slate-500'>Don't have an account? <Link className='text-primary' href='/'>Sign up</Link></p>
      </form>
    </div>

  )
}

Login.getLayout = function getLayout(page:ReactElement){
  return <PublicLayout>{page}</PublicLayout>
}


export default Login
