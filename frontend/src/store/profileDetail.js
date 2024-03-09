import {createSlice} from '@reduxjs/toolkit'

const profileDetailSlice=createSlice({
    name:"profileDetail",
    initialState:{
        user:{},
        loading:true,
        error:''
    },
    reducers:{
        profileRequest:(state,action)=>{
            return {loading:true}
        },
        profileSuccess:(state,action)=>{
            return {loading:false,user:action.payload}
        },
        profileFail:(state,action)=>{
            return {loading:false,error:action.payload}
        }
    }
})

export const profileAction=profileDetailSlice.actions

export default profileDetailSlice