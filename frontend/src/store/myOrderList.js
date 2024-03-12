import {createSlice} from '@reduxjs/toolkit'

const myorderListSlice=createSlice({
    name:'myOrderList',
    initialState:{
        loading:true,
        orders:[],
        error:''
    },
    reducers:{
        listReqest:(state,action)=>{
            return {loading:true}
        },
        listSuccess:(state,action)=>{
            return {loading:false,orders:action.payload}
        },
        listFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        listReset:(state,action)=>{
            return {orders:[]}
        }

    }
})


export const myOrderListAction=myorderListSlice.actions
export default myorderListSlice