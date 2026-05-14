// ============================================
// TYPES — adapta Item al recurso de tu dominio
// Ejemplo: Book, Medicine, Member, Dish, etc.
// ============================================

export interface Package {
  id: number;
  trackingCode: string;
  destination: string;
  weight: number;
  status: 'pending' | 'in_transit' | 'delivered';
  customerName: string;
  createdAt: Date;
}

// Tipos de respuesta genéricos — no necesitan cambio
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
