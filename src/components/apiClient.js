import axios from 'axios';

const staticToken = '9e695574-f9a7-4270-b955-1d5381b4a978'

localStorage.setItem('token', staticToken)

const apiClient = axios.create({
    baseURL: "https://momentum.redberryinternship.ge/api",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}
);
export default apiClient;