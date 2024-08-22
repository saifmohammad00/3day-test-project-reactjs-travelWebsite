import { createSlice } from "@reduxjs/toolkit";

const initialUserPageState={
    items:[],
}
const travelSlice=createSlice({
    name:'travel-page',
    initialState:initialUserPageState,
    reducers:{
        add(state,action){
            state.items=state.items.push(action.payload);
        },
        remove(state,action){
            state.items=state.items.filter(item=>item.id!==action.payload)
        }
    }
})

export const travelActions=travelSlice.actions;
export default travelSlice.reducer;