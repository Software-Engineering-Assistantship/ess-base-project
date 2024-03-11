import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { Cart } from './pages/cart/cart'
import { Restaurant } from './pages/restaurant/restaurant'
import { Menu } from './pages/menu/menu'
import { Restaurants } from './pages/restaurants/Restaurants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/restaurant/:id', element: <Restaurant /> },
      { path: '/restaurant/admin/:id', element: <Restaurant /> },
      { path: '/cardapio/:id', element: <Menu /> },
      { path: '/cardapio/admin/:id', element: <Menu /> },
      { path: '/cart', element: <Cart /> },
      { path: '/restaurants/admin', element: <Restaurants /> },
      { path: '/restaurants', element: <Restaurants /> },
    ],
  },
])
