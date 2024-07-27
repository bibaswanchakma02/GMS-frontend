import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://gmsapi-bw9k.onrender.com',
})

export default instance;