import { Package } from '../types';

export type CreateItemRepoDto = Omit<Package, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

let items: Package[] = [
  {
    id: 1,
    trackingCode: 'PKG-001',
    destination: 'Calle 123, Bogotá',
    weight: 2.5,
    status: 'pending',
    customerName: 'Carlos López',
    createdAt: new Date(),
  },
  {
    id: 2,
    trackingCode: 'PKG-002',
    destination: 'Av. Siempre Viva 742, Medellín',
    weight: 0.8,
    status: 'in_transit',
    customerName: 'María García',
    createdAt: new Date(),
  },
  {
    id: 3,
    trackingCode: 'PKG-003',
    destination: 'Carrera 45 #12-34, Cali',
    weight: 5.0,
    status: 'delivered',
    customerName: 'Andrés Torres',
    createdAt: new Date(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Package[]> {
  return [...items];
}

export async function findById(id: number): Promise<Package | undefined> {
  return items.find((p) => p.id === id);
}

export async function create(dto: CreateItemRepoDto): Promise<Package> {
  const pkg: Package = { id: nextId++, ...dto, createdAt: new Date() };
  items.push(pkg);
  return { ...pkg };
}

export async function update(id: number, dto: UpdateItemRepoDto): Promise<Package | undefined> {
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index]!, ...dto };
  return { ...items[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
