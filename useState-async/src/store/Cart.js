import { createSlice } from "@reduxjs/toolkit";

//createSlice
// A)it is a function that accepts an initial state, an object of reduer functions, and a slice name and creates action and action types that correspond to the reducers and state.

//1) It accepts single object parameter
//* name = a string name fotr this slice of state, action type will use this as a prefix

//*reducers
//It is function intended to handle a specific action type.

//action type will use this as a prefix
//initial  object parameter
//reducer function which will handle a specific action type.

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    totalQuantity: 0,
  },

  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      //check for existing item if exists [tight hand (newItem.id) from parameter]
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      //new item no existing item
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

//alernate using object destructuring
// export const { addItemToCart, removeItemFromCart} = cartSlice.actions;

export const cartActions = cartSlice.actions; //exporting the reducer functions

export default cartSlice.reducer;
