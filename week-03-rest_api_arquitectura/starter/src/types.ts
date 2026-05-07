// ============================================
// TYPES — Courier / Mensajería
// ============================================

export interface Package {
  id: number;
  trackingCode: string;
  sender: string;
  recipient: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  weightKg: number;
  createdAt: string;
}

export type CreatePackageDto = Omit<Package, 'id' | 'createdAt'>;

export type UpdatePackageDto = Partial<CreatePackageDto>;

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
