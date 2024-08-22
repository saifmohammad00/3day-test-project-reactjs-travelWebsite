import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import travelReducer from "./traveldata";


const store=configureStore({
    reducer:{auth:authReducer,user:travelReducer}
});

export default store;