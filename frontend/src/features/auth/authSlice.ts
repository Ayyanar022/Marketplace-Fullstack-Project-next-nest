import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSate, AuthUser } from "./types";
import { saveAuth ,clearAuth } from "@/utils/authStorage";



const initialState:AuthSate ={
    isAuthenticated:false,
    user:null,
    accessToken:null,
    authChecked: false, 
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess(
            state,
            action : PayloadAction <{user:AuthUser ,token:string}>
        ){
            state.isAuthenticated = true ;
            state.user = action.payload.user ;
            state.accessToken = action.payload.token;
            state.authChecked = true ;

            saveAuth({
                user:action.payload.user,
                token :action.payload.token,
            })
        },

        logout(state){
            state.isAuthenticated = false;
            state.user = null ;
            state.accessToken = null ;
            state.authChecked = true ;
           
            clearAuth()
           
        },

        authRestored(state,action){
            state.isAuthenticated = true ;
            state.user = action.payload.user;
            state.accessToken = action.payload.token;
            state.authChecked = true;
        }
    }

})


export const {loginSuccess , logout ,authRestored} = authSlice.actions;
export default authSlice.reducer;