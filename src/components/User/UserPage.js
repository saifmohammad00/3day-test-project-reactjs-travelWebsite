import { useDispatch, useSelector } from "react-redux";
import classes from "./UserPage.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

const UserPage=()=>{
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin=()=>{
         navigate("/admin");
    }
    const handleUser=()=>{
        navigate("/");
    }
    const handleLogout=()=>{
        dispatch(authActions.logout());
    }
    return <div>
    <header className={classes.header}>
        <h1>Travel Website</h1>
        <button type="button" onClick={handleUser}>User page</button>
        <button type="button" onClick={handleLogin}>Admin Login</button>
        {isAuthenticated && <button type="button" onClick={handleLogout}>Logout</button>}
    </header>
    </div>
}
export default UserPage;