import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/home/home'
import { Restaurant } from './pages/restaurant/restaurant'
import { Restaurante } from './pages/restaurante/restaurante'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/restaurant/:id', element: <Restaurant /> },
      { path: '/restaurant/admin/:id', element: <Restaurant /> },
      { path: '/restaurante/:id', element: <Restaurante /> },
      { path: '/restaurante/admin/:id', element: <Restaurante /> },
    ],
  },
])
