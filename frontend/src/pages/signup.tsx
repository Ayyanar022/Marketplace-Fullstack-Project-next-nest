import { signupApi } from '@/api/authApi';
import { loginSuccess } from '@/features/auth/authSlice';
import PublicLayout from '@/layouts/PublicLayout'
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'

const Signup = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [formData,setFormData]= useState({
    email:'',
    password:"",
    name:""
  })
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("")

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try{
      const data = await signupApi(formData.email,formData.password,formData.name);
      
      dispatch(
        loginSuccess({
          user:data.user,
          token:data.accessToken
        })
      )
      router.push("user/profile")
      
    }catch(e:any){
      setError(e.response?.data?.message||"Signup failed")
    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className='max-w-md mx-auto bg-cardBg p-6 rounded shadow'>
      <h1 className='text-xl font-semibold mb-4'>
        Signup
      </h1>
      {error && <p className='text-red-500 mb-3'>{error}</p>}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Name'
         className='border rounded p-2 '
         value={formData.name}
         onChange={(e)=>setFormData((p)=>({...p ,name:e.target.value}))}         
         />
        <input type="email" className='border p-2 rounded'
         placeholder='Email'
         value={formData.email}
         onChange={(e)=>setFormData((p)=>({...p,email:e.target.value}))}
         
         />
        <input type="password" className='border p-2 rounded' 
        placeholder='Password'
        value={formData.password}
        onChange={(e)=>setFormData(p=>({...p,password:e.target.value}))}
        />
        <button type='submit' className='bg-primary text-white py-2 rounded'>
          {loading ? "Signing up...": "Signup"}
        </button>
      </form>
    </div>
  )
}

Signup.getLayout = function getLayout(page:ReactElement){
   return <PublicLayout>{page}</PublicLayout>
}


export default Signup
