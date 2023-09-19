import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp.jsx';
import LoginUser from './pages/LoginUser/LoginUser.jsx';
import Dashboard from './pages/Dashboard/index.jsx';
import { Login } from '@mui/icons-material';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [

      {
        path: "/register",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <LoginUser />
      },

      {
        path: "/dashboard",
        element: <Dashboard />
      },

    ],

  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <RouterProvider router={router} />

  </React.StrictMode>,
)
