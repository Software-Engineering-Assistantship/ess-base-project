import { api } from '../lib/axios'

export type MenuItem = {
  id: string
  title: string
  description: string
  price: number
  quantity: number
  categoryId: string
}

export type Category = {
  id: string
  name: string
  description: string
  position: number
  restaurantId: string
  menuItems: MenuItem[]
}

export type NewCategory = {
  name: string
  description: string
  restaurantId: string
}

export type Restaurant = {
  name: string
  id: string
  type: string
  closingTime: string
  categories: Category[]
}

export async function getRestaurant(restaurantId: string) {
  const response = await api.get(`/restaurants/${restaurantId}`)

  const restaurant = response.data as Restaurant
  restaurant.categories.sort((a, b) => a.position - b.position)

  return restaurant
}

export async function saveCategory(categoryData: NewCategory) {
  try {
    const response = await api.post(`/categories`, categoryData)

    return response.data
  } catch (error) {
    return null
  }
}

export async function deleteCategory(categoryId: string) {
  const response = await api.delete(`/categories/${categoryId}`)

  return response.data
}

export async function editCategory(
  categoryId: string,
  data: Partial<Category>,
) {
  const response = await api.patch(`/categories/${categoryId}`, data)

  return response.data
}
