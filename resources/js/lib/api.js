import axios from 'axios';

const api = axios.create({
    baseURL: '', // Changed from '/api' to root to support web routes like /login
    withCredentials: true, // Ensure cookies are sent
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;
