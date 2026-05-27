export type CategorySlug =
'alimentacao' |
'beleza' |
'saude' |
'servicos' |
'moda' |
'pet' |
'casa' |
'automotivo' |
'educacao' |
'lazer';

export interface Category {
  slug: string;
  label: string;
  iconName: string;
  color: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Service {
  name: string;
  price: number;
  description?: string;
}

export interface BusinessHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface WeeklyHours {
  segunda: BusinessHours;
  terca: BusinessHours;
  quarta: BusinessHours;
  quinta: BusinessHours;
  sexta: BusinessHours;
  sabado: BusinessHours;
  domingo: BusinessHours;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'MERCHANT' | 'ADMIN';
  avatarUrl?: string | null;
  phone?: string | null;
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Business {
  id: string;
  name: string;
  category: CategorySlug;
  subcategories: string[];
  description: string;
  photos: string[];
  categoryLabel?: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    lat?: number | null;
    lng?: number | null;
  };
  contact: {
    phone?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    email?: string | null;
  };
  hours: WeeklyHours;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  services: Service[];
  priceRange: '$' | '$$' | '$$$';
  featured?: boolean;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  ownerId?: string | null;
  slug?: string;
}