import { api } from '../lib/axios'

interface SnackDetails {
  snackId: string
  quantity: number
}

interface CreateOrderBody {
  orderDetails: SnackDetails[]
}

export async function createOrder({ orderDetails }: CreateOrderBody) {
  await api.post('/orders', {
    orderDetails,
  })
}
