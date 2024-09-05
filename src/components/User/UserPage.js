import { useEffect, useRef, useState } from "react";
import classes from "./UserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/traveldata";
import { cartActions } from "../store/cart";

const UserPage = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.user.items);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(new Set([]));
    const [imageIndices, setImageIndices] = useState({});
    const [isClick, setIsClick] = useState(false);
    const [openbook,setopenBookItem]=useState(null);
    const enteredName=useRef();
    const enteredStartDate=useRef();
    const enteredEndDate=useRef();
    const enteredGuests=useRef();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

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
    const handleDone = (event,item) => {
        event.preventDefault();
        const cartitem={
            id:item.id,
            username:enteredName.current.value,
            dates:`${enteredStartDate.current.value} to ${enteredEndDate.current.value}`,
            bookStatus:false,
            price:item.price,
            image:item.images[0],
            place:item.place,
            guest:enteredGuests.current.value,
        }

        dispatch(cartActions.book(cartitem));
        enteredName.current.value="";
        enteredStartDate.current.value="";
        enteredEndDate.current.value="";
        enteredGuests.current.value="";
        setopenBookItem(null);
    }
    // Filter items based on selected category
    const filteredItems = selectedCategory ? list.filter(item => item.category === selectedCategory) : list;
    
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
                            </div>
                            <div>
                                <h1>{item.place}</h1>
                                <p>Price: {item.price}</p>
                                <p>Address: {item.address}</p>
                                <p>Category: {item.category}</p>
                                <button className={classes.bookbutton} onClick={()=>setopenBookItem(item.id)}>Book Now</button>
                            </div>
                            {openbook===item.id && (<div className={classes.overlay}>
                                <div className={classes.booknow}>
                                    <form onSubmit={(event)=>handleDone(event,item)}>
                                        <label>Name:
                                            <input type="text" ref={enteredName} required/>
                                        </label>
                                        Booking Date:<br />
                                        <label>From
                                            <input type="date" ref={enteredStartDate} required/>
                                        </label>
                                        <label>To
                                            <input type="date" ref={enteredEndDate} required/>
                                        </label>
                                        <label>Number of Guests:
                                            <input type="number" ref={enteredGuests} required/>
                                        </label>
                                        <button className={classes.addButton} type="submit">Done</button>
                                        <button className={classes.closeButton} type="button" onClick={() => setIsClick(false)}>Close</button>
                                    </form>
                                </div>
                            </div>)}
                        </div>
                        )}
                    </div>
                ))}
            </div>}
        </div>
    </div>
}
export default UserPage;