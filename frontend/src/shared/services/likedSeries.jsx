import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

export const getSeriesCurtidas = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/seriesCurtidas/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar séries curtidas:", error);
    throw error;
  }
};

export const curtir = async (userId, serie) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/curtir/${userId}`, { serie }); // Usando POST e passando o nome da série no body
    return response.data;
  } catch (error) {
    console.error("Erro ao descurtir a série:", error);
    throw error; 
  }
};

export const descurtir = async (userId, serie) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/descurtir/${userId}`, { serie }); // Usando POST e passando o nome da série no body
    return response.data;
  } catch (error) {
    console.error("Erro ao descurtir a série:", error);
    throw error; 
  }
};
