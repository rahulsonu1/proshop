import {createSlice} from '@reduxjs/toolkit'

const orderPaySlice=createSlice({
    name:'orderPay',
    initialState:{

    },
    reducers:{
        orderPayRequest:(state,action)=>{
            return {loading:true}
        },
        orderPaySuccess:(state,action)=>{
            return {loading:false,success:true}
        },
        orderPayFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        orderPayReset:(state,action)=>{
            return {}
        }
    }
})

export const orderPayAction=orderPaySlice.actions
export default orderPaySlice