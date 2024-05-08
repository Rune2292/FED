import { create } from 'zustand';

type AuthStoreType = {
  token: string | null;
  modelId?: number;
  setToken: (token: string | null) => void;
  loadToken: () => void;
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
      return;
    }

    set(claims(token));
  },
  loadToken: () => {
    const token = localStorage.getItem('jwt'); // Retrieve token from localStorage
    if (token) {
      set({ token, ...claims(token) });
    }
  },
}));

function claims(token: string) {
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const modelId = decoded["ModelId"];
  return {
    modelId,
  }
}
