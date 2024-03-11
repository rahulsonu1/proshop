import { createSlice } from "@reduxjs/toolkit";

const item=localStorage.getItem('orderItems')?JSON.parse(localStorage.getItem('orderItems')):[]

const orderFindSlice = createSlice({
  name: "orderFind",
  initialState: {
    orderItems: [],
    shippingAdddress: {},
    loading:true
  },
  reducers: {
    orderFindRequest: (state, action) => {
      return { ...state, loading: true };
    },
    orderFindSuccess: (state, action) => {
      return { loading: false, order: action.payload };
    },
    orderFindFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const orderFindAction=orderFindSlice.actions
export default orderFindSlice