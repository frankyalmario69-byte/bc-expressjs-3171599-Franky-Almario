import { z } from 'zod';

export const createPackageSchema = z.object({
  trackingCode: z.string().min(1).max(50),
  description: z.string().min(1).max(255),
  weight: z.number().positive(),
  status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'RETURNED']).optional(),
  origin: z.string().min(1).max(100),
  destination: z.string().min(1).max(100),
  customerId: z.number().int().positive(),
});

export const updatePackageSchema = createPackageSchema.partial();

export type CreatePackageDto = z.infer<typeof createPackageSchema>;
export type UpdatePackageDto = z.infer<typeof updatePackageSchema>;
