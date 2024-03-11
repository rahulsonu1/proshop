import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productList";
import productDetailSlice from "./productDetail";
import cartDetailSlice from "./cartDetail";
import userDetailSlice from "./userDetail";
import registerSlice from "./register";
import profileDetailSlice from "./profileDetail";
import updateProfileSlice from "./updateProfile";
import orderDetailSlice from "./orderDetail";

const store = configureStore({
  reducer: {
    productDetail: productDetailSlice.reducer,
    cartDetail: cartDetailSlice.reducer,
    productList: productSlice.reducer,
    userDetail: userDetailSlice.reducer,
    registerUser:registerSlice.reducer,
    profileDetail:profileDetailSlice.reducer,
    profileUpdate:updateProfileSlice.reducer,
    orderDetail:orderDetailSlice.reducer,
  },
});

export default store;
