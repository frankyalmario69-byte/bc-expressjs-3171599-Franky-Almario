import mongoose from 'mongoose';
import { Primary } from '../models/primary.model';
import { Secondary } from '../models/secondary.model';
import { AppError } from '../errors/AppError';
import type { CreatePrimaryDto, UpdatePrimaryDto } from '../schemas/primary.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

function isDuplicateKey(err: unknown): boolean {
  return err instanceof Error && 'code' in err && (err as { code: unknown }).code === 11000;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { trackingCode: { $regex: search, $options: 'i' } } : {};
  const [data, total] = await Promise.all([
    Primary.find(filter).populate('customer').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Primary.countDocuments(filter),
  ]);
  return { data, total, page, totalPages: Math.ceil(total / limit) };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const pkg = await Primary.findById(id).populate('customer').lean();
    if (!pkg) throw new AppError(404, 'Paquete no encontrado');
    return pkg;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function create(dto: CreatePrimaryDto): Promise<unknown> {
  const customerExists = await Secondary.exists({ _id: dto.customer });
  if (!customerExists) throw new AppError(404, 'Cliente no encontrado');
  try {
    const pkg = await Primary.create(dto);
    return (await pkg.populate('customer')).toJSON();
  } catch (err) {
    if (isDuplicateKey(err)) throw new AppError(409, 'Ya existe un paquete con ese código de seguimiento');
    throw err;
  }
}

export async function update(id: string, dto: UpdatePrimaryDto): Promise<unknown> {
  try {
    const pkg = await Primary.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .populate('customer')
      .lean();
    if (!pkg) throw new AppError(404, 'Paquete no encontrado');
    return pkg;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    if (isDuplicateKey(err)) throw new AppError(409, 'Ya existe un paquete con ese código de seguimiento');
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const pkg = await Primary.findByIdAndDelete(id);
    if (!pkg) throw new AppError(404, 'Paquete no encontrado');
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
