import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    cartState:false,
}
const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        toggle(state){
           state.cartState=!state.cartState;
        },
    }
})

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;