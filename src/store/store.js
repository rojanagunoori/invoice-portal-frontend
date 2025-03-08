import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import invoiceReducer from "./invoiceSlice";
import storeReducer from "./storeSlice"
import orderReducer from "./orderSlice"

 const store = configureStore({
  reducer: {
   // user: userReducer,
    stores: storeReducer,
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
    invoices: invoiceReducer,
  },
});
export default store;