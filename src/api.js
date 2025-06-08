import axios from 'axios';

const username = 'admin';
const password = '1234';
const token = btoa(`${username}:${password}`); // base64

const api = axios.create({
  baseURL: 'https://microservice-alugueis.onrender.com',
  // baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`,
  },
  withCredentials: true,
});

export default api;