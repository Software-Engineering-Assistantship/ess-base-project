import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { Menu } from './pages/menu/menu'
import { Restaurants } from './pages/restaurants/Restaurants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/restaurants/admin', element: <Restaurants /> },
      { path: '/restaurants', element: <Restaurants /> },
      { path: '/restaurants/:id', element: <Menu /> },
      { path: '/restaurants/admin/:id', element: <Menu /> },
    ],
  },
])
