import { apiRequest } from '../lib/api';
import { Category } from '../types';

export const categoriesService = {
  async list() {
    const response = await apiRequest<{ data: Category[] }>('/categories');
    return response.data;
  },
};
