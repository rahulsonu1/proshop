import { createSlice } from "@reduxjs/toolkit";

const addressFromLocalStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
 const cartItemsFromLocalStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('carItems')):[]

 console.log(cartItemsFromLocalStorage)

const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState: { cartItems: [],
  shippingAddress:addressFromLocalStorage},
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
    },
    shippingAddressDetail:(state,action)=>{
      return {...state,shippingAddress:action.payload}
    },
    savePaymentMethtod:(state,action)=>{
      return {...state,paymentMethod:action.payload}
    }
  },
});

export const cartAction = cartDetailSlice.actions;
export default cartDetailSlice;
