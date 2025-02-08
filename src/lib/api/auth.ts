import { User } from '@/types/auth';
import { apiClient } from './client';
import type { LoginFormValues } from '@/schemas/auth.schma';

interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: (data: LoginFormValues) => {
    return apiClient.post<LoginResponse>('/auth/login', data);
  },
  logout: () => {
    return apiClient.post('/auth/logout');
  },
  // 다른 인증 관련 API 호출들...
};
