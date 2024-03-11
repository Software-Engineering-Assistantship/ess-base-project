import { backend } from "@/lib/axios";

export namespace ApiCategories {


  export async function getCategories() {
    const response = await backend.get(`/categories`);
    console.log(response.data.data)
    return response.data.data;
  }
  interface createCategory {
        name: string,
        description: string
  }
  export async function createCategory(data: createCategory) {
    const response = await backend.post('/categories', data);
    return response.statusText;
  }

  interface UpdateData {
        name?: string,
        description?: string,     
  }

    export async function updateCategory(id: number, categoryData: UpdateData) {
      const response = await backend.patch(`/itens/${id}`, categoryData); //RESOLVER
      return response.data.data;
    }
 
    export async function deleteCategory(id: number) {
        const response = await backend.delete(`/itens/${id}`);
        return response.data.data;
        }
}