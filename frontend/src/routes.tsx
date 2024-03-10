import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { Restaurant } from './pages/restaurant/restaurant'
import { Restaurants } from './pages/restaurants/Restaurants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/restaurants/:id', element: <Restaurant /> },
      { path: '/restaurants/admin', element: <Restaurants /> },
      { path: '/restaurants', element: <Restaurants /> },
      { path: '/restaurants/admin/:id', element: <Restaurant /> },
    ],
  },
])
