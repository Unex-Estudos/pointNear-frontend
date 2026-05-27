import { apiRequest } from '../lib/api';
import { Business, PaginatedResponse } from '../types';

export interface BusinessSearchParams {
  q?: string;
  local?: string;
  categoria?: string;
  openNow?: boolean;
  minRating?: number;
  sort?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

function toQuery(params: BusinessSearchParams) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== false) {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
}

export const businessesService = {
  async list(params: BusinessSearchParams = {}) {
    return apiRequest<PaginatedResponse<Business>>(`/businesses${toQuery(params)}`);
  },

  async getById(id: string) {
    const response = await apiRequest<{ data: Business }>(`/businesses/${id}`);
    return response.data;
  },

  async create(payload: unknown) {
    const response = await apiRequest<{ data: Business }>('/businesses', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  },
};
