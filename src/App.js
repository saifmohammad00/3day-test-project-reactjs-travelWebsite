import { Fragment } from "react";
import SignUp from "./components/Admin/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPanel from "./components/Admin/AdminPanel";
import Header from "./components/User/Header";
import UserPage from "./components/User/UserPage";

function App() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  return (
    <Fragment>
      <Router>
      <Header/>
        <Routes>
        {isAuthenticated && <Route path="/admin" element={<AdminPanel/>}/>}
          <Route path="/" element={<UserPage/>}/>
          {!isAuthenticated && <Route path="/admin" element={<SignUp/>}/>}
        </Routes>
      </Router>
      </Fragment>
  );
}

export default App;
