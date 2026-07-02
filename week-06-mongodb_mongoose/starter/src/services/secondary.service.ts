import * as repo from '../repositories/secondary.repository';
import type { CreateSecondaryDto, UpdateSecondaryDto } from '../schemas/secondary.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createCustomer(dto: CreateSecondaryDto) {
  return repo.create(dto);
}

export async function updateCustomer(id: string, dto: UpdateSecondaryDto) {
  return repo.update(id, dto);
}

export async function deleteCustomer(id: string) {
  return repo.remove(id);
}
