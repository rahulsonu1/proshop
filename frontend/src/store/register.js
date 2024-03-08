import {createSlice} from '@reduxjs/toolkit'

const registerSlice=createSlice({
    name:'registerUser',
    initialState:{
        userInfo:{},
        loading:true,
        error:''
    },
    reducers:{
        regiserRequest:(state,action)=>{
            return {loading:true}
        },
        registerSuccess:(state,action)=>{
            return {loading:false,userInfo:action.payload}
        },
        registerFail:(state,action)=>{
            return {loading:false,error:action.payload}
        }
    }
})

export const registerAction=registerSlice.actions
export default registerSlice