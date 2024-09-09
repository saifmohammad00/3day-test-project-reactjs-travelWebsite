import { Fragment } from "react";
import SignUp from "./components/Admin/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminPanel from "./components/Admin/AdminPanel";
import Header from "./components/User/Header";
import UserPage from "./components/User/UserPage";
import Footer from "./components/User/Footer";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserPage />} exact/>
          <Route path="/admin" element={isAuthenticated?<AdminPanel/>:<Navigate to="/signup" replace />} />
          <Route path="/signup" element={!isAuthenticated?<SignUp/>:<Navigate to="/admin" replace/>} />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
        <Footer/>
      </Router>
    </Fragment>
  );
}

export default App;
