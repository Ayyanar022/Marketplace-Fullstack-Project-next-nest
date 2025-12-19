
import PublicLayout from "@/layouts/PublicLayout";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
 import "@/styles/globals.css";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/features/store";
import { getAuth } from "@/utils/authStorage";
import { authRestored, loginSuccess, logout } from "@/features/auth/authSlice";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout = NextPage & {
  getLayout? : (page:ReactElement)=>ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component : NextPageWithLayout;
}


// the component runs inside Provider
function AppInitializer({  Component , pageProps}:AppPropsWithLayout)
{
  // to restore user when refresh 
  const dispatch = useDispatch()  
  useEffect(()=>{
      const persisted = getAuth();
     
      if(persisted){  
        dispatch(authRestored(persisted))
      }else{
        dispatch(logout())
      }

  },[dispatch])

   // if page has its own layout the useit 
  const getLayout = Component.getLayout?? ((page)=><PublicLayout>{page}</PublicLayout>);
  return getLayout(<Component {...pageProps} />)
}


export default function App (props:AppPropsWithLayout){

    return (
      <Provider store={store}>
        <>
       <AppInitializer  {...props}/>
       <Toaster 
            position="top-right"
            toastOptions={{duration:3000}}
        />
        </>
      </Provider>
    )
}