import axios from 'axios';
import { useAuthStore } from '../state/authStore';

// Interceptor lets you modify the request or response before they are sent or received
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // Access token from Zustand store
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
