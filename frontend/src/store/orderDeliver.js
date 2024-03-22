import {createSlice} from '@reduxjs/toolkit'

const orderDeliverSlice=createSlice({
    name:'orderDeliver',
    initialState:{
        loading:true,
        error:'',
        success:false
    },
    reducers:{
        deliverRequest:(state,action)=>{
            return {loading:true}
        },
        deliverSuccess:(state,action)=>{
            return {loading:false,success:true}
        },
        deliverFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        deliverReset:(state,action)=>{
            return {}
        }
    }
})

export const deliverAction=orderDeliverSlice.actions
export default orderDeliverSlice