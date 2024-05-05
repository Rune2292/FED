import { create } from 'zustand';

type AuthStoreType = {
  token: string | null;
  setToken: (token: string | null) => void;
  getToken: () => string | null;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    console.log('Token to set:', token); // Log the token
    set({ token });
    if (token) {
      console.log('Token set:', token); // Log the token
      localStorage.setItem('jwt', token);  // Store token in localStorage
    } else {
      localStorage.removeItem('jwt');
    }
  },
  getToken: () => {
    const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
    console.log('Token retrieved:', token); // Log the token
    return localStorage.getItem('jwt');
  },
}));
