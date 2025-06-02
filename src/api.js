import axios from 'axios';

const api = axios.create({
  baseURL: 'https://microservice-alugueis.onrender.com', // Troque pela URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;