import { createSlice } from "@reduxjs/toolkit";

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState: {
    loading: true,
    order: {},
    error: "",
    success:false,
  },
  reducers: {
    orderCreateRequest: (state, action) => {
      return { loading: true };
    },
    orderCreateSuccess: (state, action) => {
      return { loading: false, success: true, order: action.payload };
    },
    orderCreateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const orderAction=orderDetailSlice.actions
export default orderDetailSlice
