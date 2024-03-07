import { createSlice } from "@reduxjs/toolkit";

const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState: { cartItems: [] },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    updateItemQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((x) => x.product === product);

      if (itemToUpdate) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === product ? { ...x, qty: quantity } : x
          ),
        };
      } else {
        return state;
      }
    },
    removeItem:(state,action)=>{
        return {
            ...state,
            cartItems:state.cartItems.filter((x)=>x.product!==action.payload)
        }
    }
  },
});

export const cartAction = cartDetailSlice.actions;
export default cartDetailSlice;
