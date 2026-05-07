// ============================================
// SERVICE — Lógica de negocio (packages)
// ============================================

import { CreatePackageDto, UpdatePackageDto, Package, PaginatedResponse, PaginationParams } from '../types';
import * as repo from '../repositories/packages.repository';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Package>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Package | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreatePackageDto): Promise<Package> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdatePackageDto): Promise<Package | undefined> {
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}
