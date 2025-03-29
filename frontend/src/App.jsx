import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import Home from "./pages/dashboard/Home";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  // const isAuthenticated = !!localStorage.getItem("token");
  // return isAuthenticated ? (
  //   <Navigate to="/dashboard" />
  // ) : (
  //   <Navigate to="/login" />
  // );
};
