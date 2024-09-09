import { createSlice } from "@reduxjs/toolkit";

const initialUserPageState = {
    items: [],
    selectedCategory:"",
}
const travelSlice = createSlice({
    name: 'travel-page',
    initialState: initialUserPageState,
    reducers: {
        add(state, action) {
            const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];
            payloadArray.forEach(payloadItem => {
                const itemIndex = state.items.findIndex(item => item.id === payloadItem.id)
                if (itemIndex !== -1) {
                    state.items[itemIndex] = payloadItem;
                } else {
                    state.items.push(payloadItem);
                }
            })
        },
        remove(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clickCategory(state,action){
           state.selectedCategory=action.payload;
        }
    }
})
export const fetchData = () => {
    return async(dispatch) => {
        try {
            const res = await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/travel.json')
            if (!res.ok) {
                throw new Error("failed to fetch data");
            }
            const data = await res.json();
            
            if (data && typeof data === 'object') {
                const fetchedData = Object.keys(data).map(key => ({ ...data[key], id: key }));
                dispatch(travelActions.add(fetchedData));
            }
            else {
                console.warn("fetched data is not in the expected format")
            }
        } catch (error) {
            console.log(error, "hello");
        }
    }

}

export const travelActions = travelSlice.actions;
export default travelSlice.reducer;