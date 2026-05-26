import { create } from 'zustand';
import { AuthUser } from '../types/models';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('pointnear-user') ?? 'null') as AuthUser | null;
  } catch {
    localStorage.removeItem('pointnear-user');
    return null;
  }
}

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  setSession: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: getStoredUser(),
  token: localStorage.getItem('pointnear-token'),
  setSession: (user, token) => {
    localStorage.setItem('pointnear-user', JSON.stringify(user));
    localStorage.setItem('pointnear-token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('pointnear-user');
    localStorage.removeItem('pointnear-token');
    set({ user: null, token: null });
  },
}));
