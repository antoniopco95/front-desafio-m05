import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp.jsx';
import LoginUser from './pages/LoginUser/LoginUser.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {
        path: "/register",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <LoginUser />
      },

    ],

  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <RouterProvider router={router} />

  </React.StrictMode>,
)
