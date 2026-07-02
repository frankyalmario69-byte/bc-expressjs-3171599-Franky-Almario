import { z } from 'zod';

export const createSecondarySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Email inválido').max(150),
  phone: z.string().min(1, 'El teléfono es requerido').max(20),
  address: z.string().min(1, 'La dirección es requerida').max(255),
});

export const updateSecondarySchema = createSecondarySchema.partial();

export type CreateSecondaryDto = z.infer<typeof createSecondarySchema>;
export type UpdateSecondaryDto = z.infer<typeof updateSecondarySchema>;
