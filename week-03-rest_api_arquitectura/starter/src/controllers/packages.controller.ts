// ============================================
// CONTROLLER — Interfaz HTTP (packages)
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/packages.service';
import { CreatePackageDto, UpdatePackageDto } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = parseInt(String(req.query['page'] ?? '1'), 10);
    const limit = parseInt(String(req.query['limit'] ?? '10'), 10);
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const pkg = await service.findById(id);
    if (!pkg) {
      res.status(404).json({ error: 'Not Found', message: `Package ${id} not found` });
      return;
    }
    res.json({ data: pkg });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreatePackageDto;
    const pkg = await service.create(dto);
    res.status(201).json({ data: pkg });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const dto = req.body as UpdatePackageDto;
    const pkg = await service.update(id, dto);
    if (!pkg) {
      res.status(404).json({ error: 'Not Found', message: `Package ${id} not found` });
      return;
    }
    res.json({ data: pkg });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(String(req.params['id']), 10);
    const deleted = await service.remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Package ${id} not found` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
