import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { createPackageSchema, updatePackageSchema } from '../schemas/items.schema';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(String(req.query['page'] ?? '1')));
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '10'))));
    const result = await service.listPackages(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params['id'] as string);
    const pkg = await service.getPackage(id);
    res.json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createPackageSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.issues[0]?.message ?? 'Datos inválidos' });
      return;
    }
    const pkg = await service.createPackage(parsed.data);
    res.status(201).json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params['id'] as string);
    const parsed = updatePackageSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ status: 'error', message: parsed.error.issues[0]?.message ?? 'Datos inválidos' });
      return;
    }
    const pkg = await service.updatePackage(id, parsed.data);
    res.json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params['id'] as string);
    await service.deletePackage(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
