import axios from 'axios';

const api = axios.create({
    baseURL: 'https://69ea53d715c7e2d51269b1cd.mockapi.io/pizzaolo/'
});

export default api;