import { z } from 'zod';

export const createPackageSchema = z.object({
  trackingCode: z.string().min(3, 'El código de rastreo debe tener al menos 3 caracteres'),
  customerName: z.string().min(2, 'El nombre del cliente debe tener al menos 2 caracteres'),
  originAddress: z.string().min(3, 'La dirección de origen es requerida'),
  destinationAddress: z.string().min(3, 'La dirección de destino es requerida'),
  weightKg: z.number().positive('El peso debe ser mayor a 0'),
  status: z.enum(['pending', 'in_transit', 'delivered', 'cancelled']).default('pending'),
  driverName: z.string().optional(),
  route: z.string().optional(),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageDto = z.infer<typeof createPackageSchema>;
export type UpdatePackageDto = z.infer<typeof updatePackageSchema>;
