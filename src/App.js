import { Fragment } from "react";
import SignUp from "./components/Admin/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPanel from "./components/Admin/AdminPanel";
import UserPage from "./components/User/UserPage";

function App() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  return (
    <Fragment>
      <Router>
      <UserPage/>
        {isAuthenticated && <AdminPanel/>}
        <Routes>
          {!isAuthenticated && <Route path="/admin" element={<SignUp/>}/>}
        </Routes>
      </Router>
      </Fragment>
  );
}

export default App;
