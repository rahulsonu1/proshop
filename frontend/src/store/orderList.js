import {createSlice} from '@reduxjs/toolkit'

const orderListSlice=createSlice({
    name:'orderList',
    initialState:{
        loading:true,
        orders:[],
        error:''
    },
    reducers:{
        listRequest:(state,action)=>{
            return {loading:true}
        },
        listSuccess:(state,action)=>{
            return {loading:false,orders:action.payload}
        },
        listFail:(state,action)=>{
            return {loading:false,error:action.payload}
        }
    }
})

export const orderListAction=orderListSlice.actions
export default orderListSlice