
import React from 'react'



import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'



function App() {



  return (

    <div>
      <ToastContainer />
      <Link to="/login" ></Link>
      <Outlet />
    </div>



  )
}

export default App;
