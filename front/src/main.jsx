import React from "react";
import App from "./App.jsx";
import "./index.css";

import SignUp from "./pages/SignUp/SignUp.jsx";
import LoginUser from "./pages/LoginUser/LoginUser.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>
);
