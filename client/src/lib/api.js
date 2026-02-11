import axios from 'axios';

const api = axios.create({
  // Use VITE_ prefix for environment variables in Vite
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
});

// Request interceptor to attach JWT token to every call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; // This is the missing piece!