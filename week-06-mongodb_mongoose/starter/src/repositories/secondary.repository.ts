import mongoose from 'mongoose';
import { Secondary } from '../models/secondary.model';
import { AppError } from '../errors/AppError';
import type { CreateSecondaryDto, UpdateSecondaryDto } from '../schemas/secondary.schema';

function isDuplicateKey(err: unknown): boolean {
  return err instanceof Error && 'code' in err && (err as { code: unknown }).code === 11000;
}

export async function findAll(): Promise<unknown[]> {
  return Secondary.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const customer = await Secondary.findById(id).lean();
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
    return customer;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}

export async function create(dto: CreateSecondaryDto): Promise<unknown> {
  try {
    const customer = await Secondary.create(dto);
    return customer.toJSON();
  } catch (err) {
    if (isDuplicateKey(err)) throw new AppError(409, 'Ya existe un cliente con ese email');
    throw err;
  }
}

export async function update(id: string, dto: UpdateSecondaryDto): Promise<unknown> {
  try {
    const customer = await Secondary.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).lean();
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
    return customer;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    if (isDuplicateKey(err)) throw new AppError(409, 'Ya existe un cliente con ese email');
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const customer = await Secondary.findByIdAndDelete(id);
    if (!customer) throw new AppError(404, 'Cliente no encontrado');
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) throw new AppError(400, 'ID inválido');
    throw err;
  }
}
