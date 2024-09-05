import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import travelSlice from "./traveldata";
import cartReducer from "./cart";


const store=configureStore({
    reducer:{auth:authReducer,user:travelSlice.reducer,cart:cartReducer}
});

export default store;