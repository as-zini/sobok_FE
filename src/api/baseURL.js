
import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'https://sobok-app.com',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export default baseUrl;