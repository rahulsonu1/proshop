import {createSlice} from '@reduxjs/toolkit'


const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null



const userDetailSlice=createSlice({
    name:'userDetail',
    initialState:{
    loading:true,
    userInfo:userInfoFromStorage,
    error:'',
    },
    reducers:{
        loginRequest:(state,action)=>{
            return {loading:true}
        },
        loginSuccess:(state,action)=>{
            return {loading:false,userInfo:action.payload}
        },
        loginFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        logout:(state,action)=>{
            return {}
        }
    }
})

export const userAction=userDetailSlice.actions
export default userDetailSlice