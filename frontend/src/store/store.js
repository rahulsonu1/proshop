import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productList'
import productDetailSlice from './productDetail'




const store = configureStore({
    reducer: {
      productList:productSlice.reducer,
      productDetail:productDetailSlice.reducer
    }
  })



export default store