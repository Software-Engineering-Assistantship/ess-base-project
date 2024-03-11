import { api } from '../lib/axios'
import { MenuItem } from './menu'

export interface OrderMenu {
  id: string
  orderId: string
  menuId: string
  menu: MenuItem
}

export interface Order {
  id: string
  comment: string
  rate: number
  createdAt: Date
  menuItems: OrderMenu[]
}

export interface OrderBody {
  menuItems: MenuItem[]
}

export interface UpdateOrderBody {
  orderId: string
  rate: number
  comment: string
}

interface OrderItemParams {
  orderId: string
}

export async function getAllOrders() {
  const response = await api.get<Order[]>('/order')

  return response.data
}

export async function createOrder({ menuItems }: OrderBody) {
  const response = await api.post<Order>('/order', {
    menuItems,
  })

  return response.data
}

export async function getOrderDetails({ orderId }: OrderItemParams) {
  const response = await api.get<Order>(`/order/${orderId}`)

  return response.data
}

export async function updateOrder({ orderId, rate, comment }: UpdateOrderBody) {
  const response = await api.patch<Order>(`/order/${orderId}`, {
    rate,
    comment,
  })

  return response.data
}

export async function deleteOrder({ orderId }: OrderItemParams) {
  const response = await api.delete<Order>(`/order/${orderId}`)

  return response.data
}
