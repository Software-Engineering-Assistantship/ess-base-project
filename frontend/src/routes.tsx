import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
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
      { path: '/restaurants/admin', element: <Restaurants /> },
      { path: '/restaurants', element: <Restaurants /> },
      { path: '/user', element: <User />},
      { path: '/restaurants/:id', element: <Menu /> },
      { path: '/restaurants/admin/:id', element: <Menu /> },
    ],
  },
  {
    path: '/',
    children: [
      { path: '/payment', element: <Payment />},
    ]
  }
])
