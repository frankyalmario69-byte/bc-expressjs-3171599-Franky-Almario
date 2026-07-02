import * as repo from '../repositories/primary.repository';
import type { CreatePrimaryDto, UpdatePrimaryDto } from '../schemas/primary.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createPackage(dto: CreatePrimaryDto) {
  return repo.create(dto);
}

export async function updatePackage(id: string, dto: UpdatePrimaryDto) {
  return repo.update(id, dto);
}

export async function deletePackage(id: string) {
  return repo.remove(id);
}
