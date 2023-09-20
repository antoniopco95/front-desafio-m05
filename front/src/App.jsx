
import React from 'react'



import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify'



function App() {



  return (

    <div>
      <ToastContainer />
      <a onClick={useNavigate("/login")}>aaaaaaaa</a>
      <Outlet />
    </div>



  )
}

export default App;
