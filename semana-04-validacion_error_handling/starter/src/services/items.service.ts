import { Package, PaginatedResponse } from '../types';
import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Package>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Package> {
  const pkg = await repo.findById(id);
  if (!pkg) throw new AppError(404, `Package con id ${id} no encontrado`);
  return pkg;
}

export async function create(dto: repo.CreateItemRepoDto): Promise<Package> {
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateItemRepoDto): Promise<Package> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Package con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Package con id ${id} no encontrado`);
  await repo.remove(id);
}
