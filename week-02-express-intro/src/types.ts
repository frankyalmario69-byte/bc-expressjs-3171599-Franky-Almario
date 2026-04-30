// ============================================
// TYPES: Dominio — Empresa de Mensajería (Courier)
// ============================================

export interface Item {
  id: number;
  trackingCode: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  weightKg: number;
  destination: string;
  customerName: string;
  driverName: string;
}

// DTO usado para crear un nuevo paquete (sin id, se genera automáticamente)
export type CreateItemDto = Omit<Item, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdateItemDto = Partial<CreateItemDto>;
