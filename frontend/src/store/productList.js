import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'productList',
    initialState: {
     products:[],
     error:'',
     loading:true,
    },
    reducers: {
      productListRequest:(state,action)=>{
        return {loading:true,products:[]}
      },
      productListSuccess:(state,action)=>{
        return {loading:false,products:action.payload}
      },
      productListFail:(state,action)=>{
        return {loading:false,error:action.payload}
      }
    }
})

export const productListAction=productSlice.actions
export default productSlice