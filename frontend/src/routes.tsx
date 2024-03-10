import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { Restaurant } from './pages/restaurant/restaurant'
import { Menu } from './pages/menu/menu'
import { Restaurants } from './pages/restaurants/Restaurants'
import { User } from './pages/user/user'
import { Payment } from './pages/payment/payment'

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
      { path: '/restaurants/:id', element: <Restaurant /> },
      { path: '/restaurants/admin', element: <Restaurants /> },
      { path: '/restaurants', element: <Restaurants /> },
      { path: '/restaurants/admin/:id', element: <Restaurant /> },
      { path: '/restaurant/:id', element: <Restaurant /> },
      { path: '/restaurant/admin/:id', element: <Restaurant /> },
      { path: '/user', element: <User />}
    ],
  },
  {
    path: '/',
    children: [
      { path: '/payment', element: <Payment />},
    ]
  }
])
