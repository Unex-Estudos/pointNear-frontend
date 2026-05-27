import { apiRequest } from '../lib/api';
import { Business, Category, AuthUser } from '../types';

export interface AdminDashboardData {
  users: { total: number; customers: number; merchants: number; admins: number };
  businesses: { total: number; pending: number; approved: number; rejected: number; suspended: number };
  reviews: { total: number; averageRating: number };
  categories: { total: number };
}

export const adminService = {
  async dashboard() {
    const response = await apiRequest<{ data: AdminDashboardData }>('/admin/dashboard');
    return response.data;
  },

  async businesses(status?: string) {
    const query = status ? `?status=${status}` : '';
    const response = await apiRequest<{ data: Business[] }>(`/admin/businesses${query}`);
    return response.data;
  },

  async users() {
    const response = await apiRequest<{ data: AuthUser[] }>('/admin/users');
    return response.data;
  },

  async categories() {
    const response = await apiRequest<{ data: Category[] }>('/admin/categories');
    return response.data;
  },

  async setBusinessStatus(id: string, status: string) {
    const response = await apiRequest<{ data: Business }>(`/admin/businesses/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return response.data;
  },

  async setFeatured(id: string, featured: boolean) {
    const response = await apiRequest<{ data: Business }>(`/admin/businesses/${id}/featured`, {
      method: 'PATCH',
      body: JSON.stringify({ featured }),
    });
    return response.data;
  },
};
