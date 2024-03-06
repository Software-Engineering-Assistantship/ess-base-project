import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App';
import Restaurants from './routes/Restaurants'
import RestaurantProfile from './routes/RestaurantProfile'
import ErrorPage from './routes/ErrorPage'

import UserPage from './routes/UserPage'
import Followers from './routes/Followers'
import Following from './routes/Following' 

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantProfile />
      },





      {
        path: "/users/:id",
        element: <UserPage />
      },
      {
        path: "/users/followers/:id",
        element: <Followers />
      },
      {
        path: "/users/following/:id",
        element: <Following />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
