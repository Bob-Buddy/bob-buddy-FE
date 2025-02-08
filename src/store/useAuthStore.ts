import { User } from '@/types/auth';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: User) => set({ isAuthenticated: true, user }),
  logout: () => {
    // 직접 로그아웃 시 session, local의 token 전체 삭제
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null });
  },
}));
