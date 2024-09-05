import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { cartActions } from "../store/cart";
import { useState } from "react";

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isCartVisible = useSelector(state => state.cart.cartState);
    const cartData = useSelector(state => state.cart.cartData);
    console.log(cartData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/signup");
    }
    const handleUser = () => {
        navigate("/");
    }
    const handleLogout = () => {
        dispatch(authActions.logout());
    }
    const handleSearch = (e) => {

    }
    const handleCart = () => {
        dispatch(cartActions.toggle());
    }
    const handleBooking=(item)=>{
          if(isAuthenticated){
            dispatch(cartActions.book({...item,bookStatus:true}))
          }
    }
    return <>
        <header className={classes.header}>
            <h1>Travel Website</h1>
            <img src="https://img.icons8.com/?size=100&id=2320&format=png&color=000000" alt="plane img" />
            <input type="text" placeholder="search..." onChange={handleSearch} />
            <button type="button" onClick={handleUser}>Home</button>
            <button type="button" onClick={handleLogin}>Admin Login</button>
            <img src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png" style={{ width: "50px", height: "50px" }} />
            {isAuthenticated && <button type="button" onClick={handleLogout}>Logout</button>}
            <img src="https://cdn-icons-png.flaticon.com/128/5218/5218421.png" alt="cart" style={{ width: "50px", height: "50px", marginRight: "10px" }} onClick={handleCart} />
        </header>
        {isCartVisible && <div className={classes.overlay}>
            <div className={classes.cart}>
                {cartData.map(item => {
                    return <div key={item.id} className={classes.container}>
                        <div className={classes.imageContainer}>
                            <p className={classes.placeName}>{item.place}</p>
                            <img src={item.image} className={classes.image} alt={item.place} />
                        </div>
                        <div className={classes.detailsContainer}>
                            <span className={classes.para}>User Name: {item.username}</span>
                            <span className={classes.para}>Dates: {item.dates}</span>
                            <span className={classes.para}>Guests: {item.guest}</span>
                            <span className={classes.para}>Amount: ${item.price}</span>
                            <span style={{marginBottom:"3px"}}>Booking Status:</span>
                            <button className={classes.closeButton} onClick={()=>handleBooking(item)}>{item.bookStatus?"Completed":"Pending"}</button>
                        </div>
                    </div>
                })}
                <button className={classes.closeButton} onClick={handleCart}>Close</button>
            </div>
        </div>}
    </>
}
export default Header;