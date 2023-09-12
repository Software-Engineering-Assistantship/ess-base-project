import React from 'react';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../../../shared/components/Layout';
import Home from '../pages/Home';
import InHigh from '../pages/InHigh';
import MostListened from '../pages/MostListened';
import Edition from '../pages/Edition';
import Search from '../pages/Search';

import ListContent from '../pages/ListContent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/in-high",
        Component: InHigh,
      },
      {
        path: "/most-listened",
        Component: MostListened,
      },
      {
        path: "/edition",
        Component: Edition,
      },
      {
        path: "/list_content",
        Component: ListContent,
      },
    ]
  },
  
]);

const AppRouter = () => {
  return <RouterProvider router={router}/>
};

export default AppRouter;

