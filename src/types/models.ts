export type UserRole = 'admin' | 'owner';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Establishment = {
  id: string;
  name: string;
  slug: string;
  description: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  bannerImageUrl?: string;
  galleryImageUrls: string[];
  openingHours: string[];
  isActive?: boolean;
  category: Category;
  categoryId?: string;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type EstablishmentPayload = {
  name: string;
  description: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  bannerImageUrl?: string;
  galleryImageUrls?: string[];
  openingHours?: string[];
  categoryId: string;
};
