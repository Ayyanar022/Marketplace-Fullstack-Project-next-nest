
// import PublicLayout from "@/layouts/PublicLayout";
// import { NextPage } from "next";
// import { AppProps } from "next/app";
// import { ReactElement, ReactNode, useEffect } from "react";
//  import "@/styles/globals.css";

// import { Provider, useDispatch } from "react-redux";
// import { store } from "@/features/store";
// import { getAuth } from "@/utils/authStorage";
// import { loginSuccess } from "@/features/auth/authSlice";

// export type NextPageWithLayout = NextPage & {
//   getLayout? : (page:ReactElement)=>ReactNode;
// }

// type AppPropsWithLayout = AppProps & {
//   Component : NextPageWithLayout;
// }

// export default function App ({Component , pageProps}:AppPropsWithLayout){

//   // to restore user when refresh 
//   const dispatch = useDispatch()  
//   useEffect(()=>{
//       const persisted = getAuth();
//       if(persisted){
//         dispatch(
//           loginSuccess({
//             user:persisted.user,
//             token:persisted.token,
//           })
//         )
//       }

//   },[dispatch])

//     // if page has its own layout the useit 
//     const getLayout = Component.getLayout ?? ((page)=><PublicLayout >{page}</PublicLayout>);
//     return (
//       <Provider store={store}>
//        { getLayout(<Component {...pageProps} />)}
//       </Provider>

//     )
// }




import PublicLayout from "@/layouts/PublicLayout";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
 import "@/styles/globals.css";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/features/store";
import { getAuth } from "@/utils/authStorage";
import { loginSuccess } from "@/features/auth/authSlice";

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
        dispatch(
          loginSuccess({
            user:persisted.user,
            token:persisted.token,
          })
        )
      }

  },[dispatch])

   // if page has its own layout the useit 
  const getLayout = Component.getLayout?? ((page)=><PublicLayout>{page}</PublicLayout>);
  return getLayout(<Component {...pageProps} />)
}


export default function App (props:AppPropsWithLayout){

    return (
      <Provider store={store}>
       <AppInitializer  {...props}/>
      </Provider>
    )
}