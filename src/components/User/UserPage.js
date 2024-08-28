import { useState } from "react";
import AdminList from "../Admin/AdminList";
import classes from "./UserPage.module.css";
import { useSelector } from "react-redux";
  
const UserPage = () => {
    const list=useSelector(state=>state.user.items);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(new Set(["Villa", "Apartment", "Houseboat"]));
    const [imageIndices, setImageIndices] = useState({});

    const handleNextImage = (listingId) => {
        setImageIndices(prev => {
            const index = prev[listingId] || 0;
            const newIndex = (index + 1) % list.find(item => item.id === listingId).images.length;
            return { ...prev, [listingId]: newIndex };
        });
    };

    const handlePrevImage = (listingId) => {
        setImageIndices(prev => {
            const index = prev[listingId] || 0;
            const newIndex = (index - 1 + list.find(item => item.id === listingId).images.length) % list.find(item => item.id === listingId).images.length;
            return { ...prev, [listingId]: newIndex };
        });
    };

    // Filter items based on selected category
    const filteredItems = selectedCategory ? list.filter(item => item.category === selectedCategory) : list;
    console.log(list);
    return <div style={{justifyContent:"center"}}>
        <div className={classes.userpage}>
            <h1>Travel Destinations</h1>
        </div>
        <AdminList
            list={filteredItems}
            categories={[...categories]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            imageIndices={imageIndices}
            handleNextImage={handleNextImage}
            handlePrevImage={handlePrevImage}
        />
    </div>
}
export default UserPage;