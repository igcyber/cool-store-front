import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://cool-shop.my.id/api'
});

export default Api;