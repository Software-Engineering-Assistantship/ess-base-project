import { api } from '../lib/axios'

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
