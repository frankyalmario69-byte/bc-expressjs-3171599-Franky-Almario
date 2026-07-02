import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createPrimarySchema = z.object({
  trackingCode: z.string().min(1, 'El código de seguimiento es requerido').max(50),
  description: z.string().min(1, 'La descripción es requerida').max(300),
  weightKg: z.number({ required_error: 'El peso es requerido' }).positive('El peso debe ser mayor a 0'),
  status: z.enum(['pending', 'in_transit', 'delivered', 'returned']).optional(),
  customer: z.string().regex(objectIdRegex, 'ID de cliente inválido'),
});

export const updatePrimarySchema = createPrimarySchema.partial();

export type CreatePrimaryDto = z.infer<typeof createPrimarySchema>;
export type UpdatePrimaryDto = z.infer<typeof updatePrimarySchema>;
