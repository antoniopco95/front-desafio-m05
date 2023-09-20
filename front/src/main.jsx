import React from 'react'
import App from './App.jsx'
import './index.css'

import SignUp from './pages/SignUp/SignUp.jsx';
import LoginUser from './pages/LoginUser/LoginUser.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
