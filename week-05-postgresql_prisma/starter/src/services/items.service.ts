import { AppError } from '../errors/AppError';
import * as repo from '../repositories/items.repository';
import type { CreatePackageDto, UpdatePackageDto } from '../schemas/items.schema';

export async function listPackages(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getPackage(id: number) {
  const pkg = await repo.findById(id);
  if (!pkg) throw new AppError(404, 'Paquete no encontrado');
  return pkg;
}

export async function createPackage(data: CreatePackageDto) {
  return repo.create(data);
}

export async function updatePackage(id: number, data: UpdatePackageDto) {
  return repo.update(id, data);
}

export async function deletePackage(id: number) {
  return repo.remove(id);
}
