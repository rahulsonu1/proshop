import {createSlice} from '@reduxjs/toolkit'

const updateProfileSlice=createSlice({
    name:"updateProfile",
    initialState:{
        user:{},
        success:false,
        error:'',
        loading:true
    },
    reducers:{
        updateRequest:(state,action)=>{
            return {loading:true}
        },
        updateSuccess:(state,action)=>{
            return {loading:false,success:true,user:action.payload}
        },
        updateFail:(state,action)=>{
            return {loading:false,error:action.payload }
        }
    }
})

export const updateAction=updateProfileSlice.actions
export default updateProfileSlice

