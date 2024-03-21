import {createSlice} from '@reduxjs/toolkit'

const productUpdateSlice=createSlice({
    name:'productUpdate',
    initialState:{
        product:{},
        loading:true,
        success:false,
        error:""
    },
    reducers:{
        updateRequest:(state,action)=>{
            return {loading:true}
        },
        updateSuccess:(state,action)=>{
            return {loading:false,success:true,product:action.payload}
        },
        updateFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        updateReset:(state,action)=>{
            return {}
        }
    }
})

export const productUpdateAction=productUpdateSlice.actions
export default productUpdateSlice
