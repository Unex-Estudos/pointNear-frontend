import { apiRequest, setAccessToken } from '../lib/api';
import { AuthUser } from '../types';

interface AuthResponse {
  data: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

export const authService = {
  async login(email: string, password: string) {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(response.data.accessToken);
    return response.data.user;
  },

  async register(data: { name: string; email: string; password: string; role: 'CUSTOMER' | 'MERCHANT' }) {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setAccessToken(response.data.accessToken);
    return response.data.user;
  },

  async me() {
    const response = await apiRequest<{ data: AuthUser }>('/auth/me');
    return response.data;
  },

  async logout() {
    await apiRequest<void>('/auth/logout', { method: 'POST' }).catch(() => undefined);
    setAccessToken(null);
  },
};
