import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productList";
import productDetailSlice from "./productDetail";
import cartDetailSlice from "./cartDetail";
import userDetailSlice from "./userDetail";
import registerSlice from "./register";

const store = configureStore({
  reducer: {
    productDetail: productDetailSlice.reducer,
    cartDetail: cartDetailSlice.reducer,
    productList: productSlice.reducer,
    userDetail: userDetailSlice.reducer,
    registerUser:registerSlice.reducer
  },
});

export default store;
