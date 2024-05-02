import {create} from 'zustand';

type AuthStoreType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: null,  // Initial state of the token
  setToken: (token) => set({ token }),
}));
