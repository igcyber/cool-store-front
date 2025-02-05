import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://cool-shop.my.id/api'
    // baseURL: 'http://localhost:8000/api'
});

export default Api;