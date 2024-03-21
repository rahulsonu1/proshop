import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice=createSlice({
    name:'productDelete',
    initialState:{
        loading:true,
        success:false,
        error:'',
    },
    reducers:{
        deleteRequest:(state,action)=>{
            return {loading:true}
        },
        deleteSuccess:(state,action)=>{
            return {loading:false,success:true}
        },
        deleteFail:(state,action)=>{
            return {loading:false,error:action.payload}
        }
    }
})

export const productDeleteAction=productDeleteSlice.actions

export default productDeleteSlice