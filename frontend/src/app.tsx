import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { router } from './routes'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { CartProvider } from '../src/context/cart-context'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function App() {
  return (
    <CartProvider>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </QueryClientProvider>
    </CartProvider>
  )
}
