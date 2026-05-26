import axios, { AxiosError } from 'axios';
import { AuthResponse, Category, Establishment, EstablishmentPayload, PaginatedResponse } from '../types/models';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3333/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pointnear-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type ApiIssue = { _errors?: string[] } | Record<string, { _errors?: string[] }>;
type ApiErrorBody = { message?: string; issues?: ApiIssue };

export function getApiErrorMessage(error: unknown) {
  if (!axios.isAxiosError<ApiErrorBody>(error)) return 'Não foi possível concluir a operação.';

  const data = error.response?.data;
  const fieldErrors = data?.issues && typeof data.issues === 'object'
    ? Object.values(data.issues).flatMap((issue) => typeof issue === 'object' && issue && '_errors' in issue ? issue._errors ?? [] : [])
    : [];

  return fieldErrors[0] ?? data?.message ?? 'Não foi possível concluir a operação.';
}

export function isNotFoundError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function registerUser(payload: { fullName: string; email: string; password: string }) {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function listCategories() {
  const { data } = await api.get<Category[]>('/categories');
  return data;
}

export async function listEstablishments(params: { search?: string; categoryId?: string; page?: number; limit?: number }) {
  const { data } = await api.get<PaginatedResponse<Establishment>>('/establishments', { params });
  return data;
}

export async function listMyEstablishments() {
  const { data } = await api.get<{ items: Establishment[] }>('/establishments/mine');
  return data.items;
}

export async function getEstablishment(id: string) {
  const { data } = await api.get<Establishment>(`/establishments/${id}`);
  return data;
}

export async function createEstablishment(payload: EstablishmentPayload) {
  const { data } = await api.post<Establishment>('/establishments', payload);
  return data;
}

export async function updateEstablishment(id: string, payload: Partial<EstablishmentPayload>) {
  const { data } = await api.put<Establishment>(`/establishments/${id}`, payload);
  return data;
}

export async function deleteEstablishment(id: string) {
  await api.delete(`/establishments/${id}`);
}

export async function uploadEstablishmentImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post<{ imageUrl: string; originalName: string }>('/establishments/images/upload', formData);
  return data;
}

export type ApiError = AxiosError<ApiErrorBody>;
