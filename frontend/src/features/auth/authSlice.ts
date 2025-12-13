import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSate, AuthUser } from "./types";



const initialState:AuthSate ={
    isAuthenticated:false,
    user:null,
    accessToken:null,
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
        },

        logout(state){
            state.isAuthenticated = false;
            state.user = null ;
            state.accessToken = null ;
        }
    }

})


export const {loginSuccess , logout} = authSlice.actions;
export default authSlice.reducer;