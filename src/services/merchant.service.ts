import { apiRequest } from '../lib/api';
import { Business } from '../types';

export interface MerchantDashboard {
  summary: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    averageRating: number;
  };
  businesses: Business[];
}

export const merchantService = {
  async dashboard() {
    const response = await apiRequest<{ data: MerchantDashboard }>('/merchant/dashboard');
    return response.data;
  },
};
