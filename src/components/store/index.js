import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import travelReducer from "./traveldata";
import cartReducer from "./cart";


const store=configureStore({
    reducer:{auth:authReducer,user:travelReducer,cart:cartReducer}
});

export default store;