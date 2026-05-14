import { z } from 'zod';

export const createItemSchema = z.object({
  trackingCode: z
    .string({ error: 'trackingCode es obligatorio' })
    .min(3, 'trackingCode debe tener al menos 3 caracteres')
    .trim(),
  destination: z
    .string({ error: 'destination es obligatorio' })
    .min(3, 'destination debe tener al menos 3 caracteres')
    .trim(),
  weight: z
    .number({ error: 'weight es obligatorio y debe ser un número' })
    .positive('El peso debe ser mayor a 0 kg'),
  status: z
    .enum(['pending', 'in_transit', 'delivered'], {
      error: 'status debe ser pending, in_transit o delivered',
    })
    .default('pending'),
  customerName: z
    .string({ error: 'customerName es obligatorio' })
    .min(1, 'customerName no puede estar vacío')
    .trim(),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
