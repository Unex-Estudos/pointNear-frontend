import { apiRequest } from '../lib/api';
import { Business } from '../types';

export const usersService = {
  async favorites() {
    const response = await apiRequest<{ data: Business[] }>('/users/me/favorites');
    return response.data;
  },

  async addFavorite(businessId: string) {
    await apiRequest<void>(`/users/me/favorites/${businessId}`, { method: 'POST' });
  },

  async removeFavorite(businessId: string) {
    await apiRequest<void>(`/users/me/favorites/${businessId}`, { method: 'DELETE' });
  },
};
