import {configureStore} from "@reduxjs/toolkit"
import authReducer from './auth/authSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
    }, 
})


export type rootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;