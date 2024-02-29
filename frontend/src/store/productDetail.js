import {createSlice} from '@reduxjs/toolkit'

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
     product:{
        reviews:[]
     },
     loading:true,
     error:''
     
    },
    reducers: {
        productDetailRequest:(state,action)=>{
        return {loading:true,...state}
      },
      productDetailSuccess:(state,action)=>{
        return {loading:false,product:action.payload}
      },
      productDetailFail:(state,action)=>{
        return {loading:false,error:action.payload}
      }

    }
})

export const productDetailAction=productDetailSlice.actions
export default productDetailSlice