import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },
    removeToCart: (state, action) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload);

      if (itemIndex !== -1) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1); 
        }
      }
    },
    clearCart: (state) => {
      state = [];
    },
    
  },
});

export const { addToCart, removeToCart, clearCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
