import { create } from 'zustand';

type AuthStoreType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,
  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      localStorage.setItem('jwt', token);  // Store token in localStorage
    } else {
      localStorage.removeItem('jwt');
    }
  },
}));
