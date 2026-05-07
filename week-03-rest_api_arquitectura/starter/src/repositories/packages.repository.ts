// ============================================
// REPOSITORY — Acceso a datos (packages)
// ============================================

import { Package, CreatePackageDto, UpdatePackageDto } from '../types';

const store: Package[] = [
  { id: 1, trackingCode: 'PKG-001', sender: 'Ana García', recipient: 'Luis Pérez', status: 'delivered', weightKg: 2.5, createdAt: '2026-05-01T10:00:00.000Z' },
  { id: 2, trackingCode: 'PKG-002', sender: 'Carlos Ruiz', recipient: 'María López', status: 'in_transit', weightKg: 0.8, createdAt: '2026-05-02T11:30:00.000Z' },
  { id: 3, trackingCode: 'PKG-003', sender: 'Sofía Torres', recipient: 'Pedro Mora', status: 'pending', weightKg: 5.0, createdAt: '2026-05-03T09:15:00.000Z' },
  { id: 4, trackingCode: 'PKG-004', sender: 'Diego Vargas', recipient: 'Elena Castro', status: 'pending', weightKg: 1.2, createdAt: '2026-05-04T14:00:00.000Z' },
  { id: 5, trackingCode: 'PKG-005', sender: 'Laura Mendez', recipient: 'Roberto Silva', status: 'cancelled', weightKg: 3.3, createdAt: '2026-05-05T08:45:00.000Z' },
];
let nextId = 6;

export async function findAll(): Promise<Package[]> {
  return [...store];
}

export async function findById(id: number): Promise<Package | undefined> {
  return store.find((pkg) => pkg.id === id);
}

export async function create(dto: CreatePackageDto): Promise<Package> {
  const pkg: Package = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(pkg);
  return { ...pkg };
}

export async function update(id: number, dto: UpdatePackageDto): Promise<Package | undefined> {
  const index = store.findIndex((pkg) => pkg.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((pkg) => pkg.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
