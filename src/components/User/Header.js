import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { cartActions } from "../store/cart";

const Header = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isCartVisible = useSelector(state => state.cart.cartState);
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
        console.log(isCartVisible);
    }
    return <>
        <header className={classes.header}>
            <h1>Travel Website</h1>
            <img src="https://img.icons8.com/?size=100&id=2320&format=png&color=000000" alt="plane img"/>
            <input type="text" placeholder="search..." onChange={handleSearch} />
            <button type="button" onClick={handleUser}>Home</button>
            <button type="button" onClick={handleLogin}>Admin Login</button>
            {isAuthenticated && <button type="button" onClick={handleLogout}>Logout</button>}
            <button type="button" style={{ marginRight: "10px" }} onClick={handleCart}>Cart</button>
        </header>
        {isCartVisible && <div className={classes.overlay}>
                <div className={classes.cart}>
                    <h2>Your Cart</h2>
                    <p>Cart items will be displayed here.</p>
                    <h2>Your Cart</h2>
                    <p>Cart items will be displayed here.</p>
                    <button className={classes.closeButton} onClick={handleCart}>Close</button>
                </div>
            </div>}
    </>
}
export default Header;