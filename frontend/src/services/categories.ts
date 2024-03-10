import { backend } from "@/lib/axios";

export namespace ApiCategories {
  export async function getCategories() {
    const response = await backend.get(`/categories`);
    return response.data.data;
  }

  interface createCategory {
    name: string,
    description: string,
  }

  export async function createCategory(data: createCategory) {
    const response = await backend.post('/categories', data);
    return response.statusText;
  }

  interface UpdateCategoryData {
    name?: string,
    description?: string,   
  }

  export async function updateCategory(id: number, categoryData: UpdateCategoryData) {
    const response = await backend.patch(`/categories/${id}`, categoryData);
    return response.data.data;
  }

  export async function deleteCategory(id: number) {
    const response = await backend.delete(`/categories/${id}`);
    return response.data.data;
  }
}
