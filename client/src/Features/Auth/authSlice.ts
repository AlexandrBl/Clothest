// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { StateAuth, User } from "./type";
// import * as api from './api'

// const initialState:StateAuth = {user:null,message:''}

// export const authRegistration = createAsyncThunk(
//     'auth/registration',
//     (obj:User) =>  api.registrationFetch(obj));
// export const authCheck = createAsyncThunk(
//         'auth/check',
//         () =>  api.checkFetch());
   
// const authSlice = createSlice({
//     name:'auth',
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(authRegistration.fulfilled,(state,action)=>{
//             state.user=action.payload
//             state.message=''
//         })
//         .addCase(authRegistration.rejected,(state,action)=>{
//             state.message=action.error.message
//         })
//         .addCase(authCheck.fulfilled,(state,action)=>{
//             state.user=action.payload.user
//         })
//         .addCase(authCheck.rejected,(state,action)=>{
//             state.message = action.error.message
//         })
//     }
// })


// export default authSlice.reducer;