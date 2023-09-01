// apiService.ts

import axios from 'axios';

export function useApiService() {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users/1'; // Replace with your API URL

  async function fetchData() {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return {
    fetchData,
  };
}
