import { createSlice } from "@reduxjs/toolkit";

const topProductSlice=createSlice({
    name:"topProduct",
    initialState:{
        loading:true,
        products:[],
        error:''
    },
    reducers:{
        topProductRequest:(state,action)=>{
            return {loading:true}
        },
        topProductSuccess:(state,action)=>{
            return {loading:false,products:action.payload}
        },
        topProductFail:(state,action)=>{
            return {loading:false, error:action.payload}
        }
    }
})

export const topProductsAction=topProductSlice.actions

export default topProductSlice