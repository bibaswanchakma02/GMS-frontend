import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://gmsapi-bw9k.onrender.com',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;