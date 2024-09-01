import { useEffect, useState } from "react";
import classes from "./UserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/traveldata";

const UserPage = () => {
    const dispatch=useDispatch();
    const list = useSelector(state => state.user.items);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(new Set([]));
    const [imageIndices, setImageIndices] = useState({});

    useEffect(()=>{
       dispatch(fetchData());
    },[dispatch]);
    
    useEffect(() => {
        if (list.length > 0) {
          const newCategories = new Set(list.map(item => item.category));
          setCategories(prev => new Set([...prev, ...newCategories]));
          const newImageIndices = list.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
          }, {});
          setImageIndices(newImageIndices);
        }
      }, [list]);

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
    return <div style={{ justifyContent: "center" }}>
        <div className={classes.userpage}>
            <h1>Travel Destinations</h1>
        </div>
        <div style={{ width: "100%" }}>
            {!selectedCategory && <div style={{ textAlign: "center" }}>
                <h2>Categories</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
                    {[...categories].map(category => (
                        <div key={category} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer', width: "80%", margin: "10px", flex: "1 1 calc(25% - 16px)" }}>
                            <h3>{category}</h3>
                            {filteredItems.some(item => item.category === category) && (
                                <img
                                    src={list.find(item => item.category === category).images[0]}
                                    alt={category}
                                    style={{ height: "300px", width: "400px" }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>}
            {selectedCategory && <div style={{ display: "grid", justifyContent: "center" }}>
                <h2>Submitted Items</h2>
                {filteredItems.map((item) => (
                    <div key={item.id}>
                        {item.images.length > 0 && (<div className={classes.card}>
                            <div className={classes.slider}>
                                <button
                                    className={classes.prevButton}
                                    onClick={() => handlePrevImage(item.id)}
                                >
                                    &#10094;
                                </button>
                                <img
                                    src={item.images[imageIndices[item.id] || 0]}
                                    alt="Slider Image"
                                    className={classes.sliderImage}
                                />
                                <button
                                    className={classes.nextButton}
                                    onClick={() => handleNextImage(item.id)}
                                >
                                    &#10095;
                                </button>
                                {/* <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item)}>Delete</button> */}
                            </div>
                            <div>
                                <h1>{item.place}</h1>
                                <p>Price: {item.price}</p>
                                <p>Address: {item.address}</p>
                                <p>Category: {item.category}</p>
                                <button>Book Now</button>
                            </div>
                        </div>
                        )}
                    </div>
                ))}
            </div>}
        </div>
    </div>
}
export default UserPage;