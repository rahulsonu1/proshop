import {createSlice} from '@reduxjs/toolkit'

const userListSlice=createSlice({
    name:'userList',
    initialState:{
        users:[],
        error:'',
        loading:true
    },
    reducers:{
        listRequest:(state,action)=>{
            return {loading:true}
        },
        listSuccess:(state,action)=>{
            return {loading:false,users:action.payload}
        },
        listFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        listReset:(state,action)=>{
            return {users:[]}
        }
    }
})

export const userListAction=userListSlice.actions
export default userListSlice