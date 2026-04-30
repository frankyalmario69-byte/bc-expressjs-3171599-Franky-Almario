import { Router } from 'express';
import * as store from '../store.js';
import type { CreateItemDto, UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /packages — Listar todos los paquetes
itemsRouter.get('/', (_req, res) => {
  res.json(store.getAll());
});

// GET /packages/:id — Obtener paquete por ID
itemsRouter.get('/:id', (req, res) => {
  const item = store.getById(Number(req.params.id));
  if (!item) {
    res.status(404).json({ error: 'Package not found' });
    return;
  }
  res.json(item);
});

// POST /packages — Crear nuevo paquete
itemsRouter.post('/', (req, res) => {
  const dto: CreateItemDto = req.body;
  const created = store.create(dto);
  res.status(201).json(created);
});

// PUT /packages/:id — Actualizar paquete
itemsRouter.put('/:id', (req, res) => {
  const dto: UpdateItemDto = req.body;
  const updated = store.update(Number(req.params.id), dto);
  if (!updated) {
    res.status(404).json({ error: 'Package not found' });
    return;
  }
  res.json(updated);
});

// DELETE /packages/:id — Eliminar paquete
itemsRouter.delete('/:id', (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) {
    res.status(404).json({ error: 'Package not found' });
    return;
  }
  res.status(204).send();
});
