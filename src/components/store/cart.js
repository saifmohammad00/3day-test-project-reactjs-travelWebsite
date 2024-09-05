import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    cartData:[],
    cartState:false,
}
const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        toggle(state){
           state.cartState=!state.cartState;
        },
        book(state,action){
            const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];
            payloadArray.forEach(payloadItem => {
                const itemIndex = state.cartData.findIndex(item => item.id === payloadItem.id)
                if (itemIndex !== -1) {
                    state.cartData[itemIndex] = payloadItem;
                } else {
                    state.cartData.push(payloadItem);
                }
            })
        }
    }
})

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;