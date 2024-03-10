import { api } from '../lib/axios'

export interface MenuItemBody {
  id?: string
  title: string
  description: string
  price: number
  quantity: number
  categoryId: string
}

export interface MenuItem {
  id: string
  title: string
  description: string
  price: number
  quantity: number
  categoryId: string
}

export interface Category {
  id: string
  name: string
  description: string
  position: number
  restaurantId: string
  menuItems: MenuItem[]
}

interface GetAllCategoriesParams {
  restaurantId: string
}

export async function getAllCategories({
  restaurantId,
}: GetAllCategoriesParams) {
  const response = await api.get<Category[]>(
    `/categories/restaurant/${restaurantId}`,
  )

  return response.data
}

export async function createMenuItem(menuItem: MenuItemBody) {
  await api.post('/menu', {
    title: menuItem.title,
    description: menuItem.description,
    price: menuItem.price,
    quantity: menuItem.quantity,
    categoryId: menuItem.categoryId,
  })
}

export async function updateMenuItem(menuItem: MenuItemBody) {
  await api.patch(`/menu/item/${menuItem.id}`, {
    title: menuItem.title,
    description: menuItem.description,
    price: menuItem.price,
    quantity: menuItem.quantity,
    categoryId: menuItem.categoryId,
  })
}

export async function deleteMenuItem(menuItemId: string) {
  await api.delete(`/menu/item/${menuItemId}`)
}
