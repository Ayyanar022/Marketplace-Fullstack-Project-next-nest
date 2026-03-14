import { loginApi, signupApi } from '@/api/authApi';
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
  const[password,setPassword] = useState('');
  const[confirmPassword,setConfirmPassword] = useState('');
  const[userName,setUserName] = useState('');
  const [loading,setLoading] = useState(false);
  const [error ,setError] = useState('');
  const [isSignUp,setIsSignUp] = useState(false)

  const handleSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      setError('');
      setLoading(true);

      try{

        if(!isSignUp){
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
        }else{
            const data = await signupApi(email,password,userName);
            
            dispatch(
              loginSuccess({
                user:data.user,
                token:data.accessToken
              })
            )
            router.push("user/profile")
        }

      }catch(e:any){
        console.log(e)
        setError(e.response?.data?.message||"Login failed");
      }finally{
        setLoading(false);
      }
    
  }


  return (

    <div className='flex flex-1 items-center justify-center p-0 lg:p-10 min-h-[calc(100vh-120px)]'>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-[880px] w-full bg-surface rounded-xl overflow-hidden shadow-md border-border'>
        <div className='login-bg text-white flex items-center justify-center p-3 py-8 lg:p-10 lg:py-16 overflow-hidden'>
            <div className='relative text-center'>
                <div className="mb-7 md:mb-12">
                  <span className="inline-block text-4xl m-2 animate-bounce  art-emoji a2">👗</span>
                  <span className="inline-block text-4xl m-2 animate-bounce  art-emoji a3">📱</span>
                  <span className="inline-block text-4xl m-2 animate-bounce art-emoji  a1">🛒</span> 
                  <span className="inline-block text-4xl m-2 animate-bounce  art-emoji a4">🍊</span>
                  <span className="inline-block text-4xl m-2 animate-bounce  art-emoji a5">🍓</span>
              </div>
              <h2 className='text-2xl'>Welcome to Marketplace</h2>
              <p className='text-sm mt-3'>Your one-stop destination for fresh, organic groceries from multiple sellers, delivered straight to your door.</p>

            </div>
        </div>

        {/* form */}
        <div className='py-10 p-4 md:px-10 flex flex-col '>
              <div className='mb-7'>
                <Link href={'/'} className='inline-flex items-center gap-1 text-primary mb-5 font-bold text-xl'>
                 <span>🛒</span> Market Place
                </Link>
                <h1 className='text-2xl font-bold mb-2'>{isSignUp  ?"Create Account " : "Sign In"}</h1>
                <h1 className='text-textMuted text-base'>{isSignUp  ?"Join us for the freshest deals" : "Welcome back! Sign in to continue"}</h1>
              </div>

              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {isSignUp && (
                  <div className=''>
                  <label htmlFor="username" className='block font-[600] text-textMuted text-sm mb-1 uppercase tracking-wide'>User Name</label>
                  <div className='login-input-wrap flex items-center border border-border rounded-sm px-3 bg-bg '>
                    <span className='text-sm mr-2 shrink-0'>👤</span>
                      <input type="text" id='username' placeholder='Your name' 
                      className=' p-2 rounded  border-none outline-none bg-transparent w-full text-text focus-within:border-primary' 
                      value={userName}
                      onChange={(e)=>setUserName(e.target.value)}
                      />
                  </div>
                </div>
                )}

                <div className=''>
                  <label htmlFor="email" className='block font-[600] text-textMuted text-sm mb-1 uppercase tracking-wide'>Email</label>
                  <div className='login-input-wrap flex items-center border border-border rounded-sm px-3 bg-bg '>
                    <span className='text-sm mr-2 shrink-0'>✉️</span>
                      <input type="email" id='email' placeholder='you@gmail.com' 
                      className=' p-2 rounded  border-none outline-none bg-transparent w-full text-text focus-within:border-primary' 
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                  </div>
                </div>

                <div>
                  <label htmlFor="password"  className='block font-[600] text-textMuted text-sm mb-1 uppercase tracking-wide'>Password</label>
                  <div className='login-input-wrap flex items-center border border-border rounded-sm px-3 bg-bg'>
                       <span className='text-sm mr-2 shrink-0'>🔒</span>
                      <input type="password" id='password' placeholder='Password' className=' p-2 rounded  border-none outline-none bg-transparent w-full text-text focus-within:border-primary' 
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      />
                  </div>
                </div>


                    {isSignUp && (
                  <div className=''>
                  <label htmlFor="confirmPassword" className='block font-[600] text-textMuted text-sm mb-1 uppercase tracking-wide'>confirm Password</label>
                  <div className='login-input-wrap flex items-center border border-border rounded-sm px-3 bg-bg '>
                    <span className='text-sm mr-2 shrink-0'>🔒</span>
                      <input type="password" id='confirmPassword' placeholder='Confirm password' 
                      className=' p-2 rounded  border-none outline-none bg-transparent w-full text-text focus-within:border-primary' 
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      />
                  </div>
                </div>
                )}

                {!isSignUp && (
                  <div className='flex justify-between items-center text-sm'>
                    <label  className='flex items-center gap-1 text-textMuted cursor-pointer'>
                      <input type="checkbox" className='accent-primary'/>
                      <span>Remember me</span>
                    </label>
                    <a href="#" className='text-primary font-[500] hover:underline'>Forgot Password?</a>
                  </div>
                )}



                <button type='submit' className='login-submit-btn transition p-2 mt-2 bg-gradient-to-tr from-primary to-[#059669] text-white rounded-sm font-[700] '>
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>

              </form>

                <div className='login-divider flex items-center gap-3 mx-5 text-[#bbb] text-sm mt-5'>
                  <span>or</span>
                </div>

                <div className='text-center text-sm text-textMuted mt-3'>
                  {isSignUp ? (
                    <p>
                      Already have an account?{" "}
                          <button className="bg-none text-primary font-[700] text-sm p-0 underline hover:text-primaryDark" onClick={() => { setIsSignUp(false); setError(""); }}>
                              Sign In
                          </button>
                    </p>
                  ):(
                    <p>
                        Don't have an account?{" "}
                      <button className="bg-none text-primary font-[700] text-sm p-0 underline hover:text-primaryDark"  onClick={() => { setIsSignUp(true); setError(""); }}>
                          Create one
                      </button>
                    </p>

                  )}
                </div>



            {/* <form onSubmit={handleSubmit} className='flex flex-col gap-8 '>
            
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
          </form> */}
        </div>
      </div>

   
    
    </div>

  )
}

Login.getLayout = function getLayout(page:ReactElement){
  return <PublicLayout>{page}</PublicLayout>
}


export default Login
