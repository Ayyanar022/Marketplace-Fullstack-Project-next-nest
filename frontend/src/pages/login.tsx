import { loginApi } from '@/api/authApi';
import { loginSuccess } from '@/features/auth/authSlice';
import PublicLayout from '@/layouts/PublicLayout'
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
        
        console.log("data",data)
       
          // to store crrent user in store
        dispatch(
          loginSuccess({
            user:data.user,
            token:data.accessToken,
          })
        );

        // redirect by role
        if(data.user.role==='ADMIN') router.push("/admin");
        else if(data.user.role ==='SELLER') router.push("/seller");
        else router.push("/user/profile");

      }catch(e:any){
        console.log(e)
        setError(e.response?.data?.message||"Login failed");
      }finally{
        setLoading(false);
      }
    
  }


  return (
    <div className='max-w-md mx-auto bg-cardBg p-6 rounded shadow'>
      <h1 className='text-xl font-semibold mb-4'>Login</h1>
     {error && <p className='text-red-500 mb-3'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' className='border p-2 rounded' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="password" placeholder='Password' className='border p-2 rounded'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button type='submit' className='bg-primary text-white py-2 rounded'>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

Login.getLayout = function getLayout(page:ReactElement){
  return <PublicLayout>{page}</PublicLayout>
}


export default Login
