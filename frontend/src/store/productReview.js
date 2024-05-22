import {createSlice} from '@reduxjs/toolkit'

const createReviewSlice=createSlice({
    name:'createReview',
    initialState:{
        loading:true,
        error:'',
        success:false
    },
    reducers:{
        createRequest:(state,action)=>{
            return {loading:true}
        },
        createSuccess:(state,action)=>{
            return {loading:false,success:true}
        },
        createFail:(state,action)=>{
            return {loading:false,error:action.payload}
        },
        createReset:(state,action)=>{
            return {}
        }
    }
})

export const createReviewAction=createReviewSlice.actions
export default createReviewSlice