import { IPackage } from '../models/package.model';
import * as packageRepository from '../repositories/package.repository';
import { CreatePackageDto, UpdatePackageDto } from '../schemas/package.schema';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<IPackage[]> {
  return packageRepository.findAll();
}

export async function getById(id: string): Promise<IPackage> {
  const pkg = await packageRepository.findById(id);
  if (!pkg) {
    throw new AppError(404, 'Paquete no encontrado');
  }
  return pkg;
}

export async function create(dto: CreatePackageDto, userId: string): Promise<IPackage> {
  return packageRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdatePackageDto): Promise<IPackage> {
  await getById(id);
  const updated = await packageRepository.updateById(id, dto);
  if (!updated) {
    throw new AppError(404, 'Paquete no encontrado');
  }
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await packageRepository.deleteById(id);
  if (!deleted) {
    throw new AppError(404, 'Paquete no encontrado');
  }
}
