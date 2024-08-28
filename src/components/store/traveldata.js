import { createSlice } from "@reduxjs/toolkit";

const initialUserPageState={
    items:[
        { id: 0, place: "Villa Serenity", price: "150", address: "123 Ocean Drive, Malibu, CA 90265", images: ["https://picsum.photos/seed/villa1/300/200", "https://picsum.photos/seed/villa2/300/200"], category: "Villa" },
        { id: 1, place: "Mediterranean Escape", price: "250", address: "456 Coastal Road, Santorini, Greece", images: ["https://picsum.photos/seed/villa3/300/200", "https://picsum.photos/seed/villa4/300/200", "https://picsum.photos/seed/villa5/300/200"], category: "Villa" },
        { id: 2, place: "Mountain Retreat", price: "180", address: "789 Summit Drive, Aspen, CO 81611", images: ["https://picsum.photos/seed/villa6/300/200", "https://picsum.photos/seed/villa7/300/200", "https://picsum.photos/seed/villa8/300/200"], category: "Villa" },
        { id: 3, place: "Urban Apartment", price: "80", address: "456 City Center, New York, NY 10001", images: ["https://picsum.photos/seed/apartment1/300/200", "https://picsum.photos/seed/apartment2/300/200"], category: "Apartment" },
        { id: 4, place: "Chic Downtown Loft", price: "120", address: "123 Main Street, San Francisco, CA 94105", images: ["https://picsum.photos/seed/apartment3/300/200", "https://picsum.photos/seed/apartment4/300/200", "https://picsum.photos/seed/apartment5/300/200"], category: "Apartment" },
        { id: 5, place: "Cozy Studio", price: "65", address: "789 Elm Street, Austin, TX 78701", images: ["https://picsum.photos/seed/apartment6/300/200", "https://picsum.photos/seed/apartment7/300/200"], category: "Apartment" },
        { id: 6, place: "Luxury Houseboat", price: "350", address: "101 Floating Dock, Seattle, WA 98109", images: ["https://picsum.photos/seed/houseboat1/300/200", "https://picsum.photos/seed/houseboat2/300/200", "https://picsum.photos/seed/houseboat3/300/200"], category: "Houseboat" },
        { id: 7, place: "Serene Floating Home", price: "290", address: "202 Harbor View, Amsterdam, Netherlands", images: ["https://picsum.photos/seed/houseboat4/300/200", "https://picsum.photos/seed/houseboat5/300/200", "https://picsum.photos/seed/houseboat6/300/200"], category: "Houseboat" },
        { id: 8, place: "Rustic Houseboat Retreat", price: "220", address: "303 River Bend, Nashville, TN 37203", images: ["https://picsum.photos/seed/houseboat7/300/200", "https://picsum.photos/seed/houseboat8/300/200"], category: "Houseboat" }
      ]
}
const travelSlice=createSlice({
    name:'travel-page',
    initialState:initialUserPageState,
    reducers:{
        add(state,action){
            const item=state.items.find(item=>item.id===action.payload.id)
            if(item){
                state.items=state.items.map(newItem=>newItem.id===item.id?action.payload:newItem)
                return;
            }
            state.items=state.items.push(action.payload);
        },
        remove(state,action){
            state.items=state.items.filter(item=>item.id!==action.payload)
        }
    }
})

export const travelActions=travelSlice.actions;
export default travelSlice.reducer;