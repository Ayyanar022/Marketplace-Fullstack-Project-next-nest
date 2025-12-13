
import PublicLayout from "@/layouts/PublicLayout";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
 import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/features/store";

export type NextPageWithLayout = NextPage & {
  getLayout? : (page:ReactElement)=>ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component : NextPageWithLayout;
}

export default function App ({Component , pageProps}:AppPropsWithLayout){
    // if page has its own layout the useit 
    const getLayout = Component.getLayout ?? ((page)=><PublicLayout >{page}</PublicLayout>);
    return (
      <Provider store={store}>
       { getLayout(<Component {...pageProps} />)}
      </Provider>

    )
}