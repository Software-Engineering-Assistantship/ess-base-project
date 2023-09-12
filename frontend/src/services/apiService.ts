import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000, // Defina um limite de tempo de resposta, se desejar
});

export default {
  // Métodos para buscar Pokémons
  getPokemon(id) {
    return apiClient.get(`pokemon/${id}`);
  },
  // Outros métodos relacionados aos Pokémons
};