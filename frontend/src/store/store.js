import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productList'
import productDetailSlice from './productDetail'
import cartDetailSlice from './cartDetail'




const store = configureStore({
    reducer: {
      productDetail:productDetailSlice.reducer,
      cartDetail:cartDetailSlice.reducer,
      productList:productSlice.reducer,
     

    }
  })



export default store