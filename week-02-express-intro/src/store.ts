import type { Item, CreateItemDto, UpdateItemDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
const items: Item[] = [];
let nextId = 1;

export function getAll(): Item[] {
  return items;
}

export function getById(id: number): Item | undefined {
  return items.find((item) => item.id === id);
}

export function create(data: CreateItemDto): Item {
  const newItem: Item = { id: nextId++, ...data };
  items.push(newItem);
  return newItem;
}

export function update(id: number, data: UpdateItemDto): Item | undefined {
  const item = items.find((i) => i.id === id);
  if (!item) return undefined;
  Object.assign(item, data);
  return item;
}

export function remove(id: number): boolean {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
