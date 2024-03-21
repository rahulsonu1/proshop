import { createSlice } from "@reduxjs/toolkit";

const productCreateSlice=createSlice({
    name:'productCreate',
    initialState:{
        loading:true,
        success:false,
        error:'',
        product:{}
    },
    reducers:({
        createRequest:(state,action)=>{
            return {loading:true}
        },
        createSuccess:(state,action)=>{
            return {loading:false,success:true,product:action.payload}
        },
        createFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        createReset:(state,action)=>{
            return {}
        }
    })
})

export const productCreateAction=productCreateSlice.actions
export default productCreateSlice