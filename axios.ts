import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create();

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance();
