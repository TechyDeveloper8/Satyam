import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://satyam-qhyp.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('satyam_user') || localStorage.getItem('aether_user');
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
