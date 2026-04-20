import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./Cart";

const store = configureStore({
  reducer: {
     ui: uiSlice, 
     cart: cartSlice },
});

export default store;

/*
configureStore is the modern way to create a Redux store (simpler + safer).

These should be reducers, not full slices
(i.e., export default slice.reducer)

*/
