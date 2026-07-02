import { Request, Response, NextFunction } from 'express';
import * as packageService from '../services/package.service';
import { createPackageSchema, updatePackageSchema } from '../schemas/package.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const packages = await packageService.getAll();
    res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const pkg = await packageService.getById(String(req.params.id));
    res.status(200).json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createPackageSchema.parse(req.body);
    const userId = req.user!.sub;
    const pkg = await packageService.create(dto, userId);
    res.status(201).json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updatePackageSchema.parse(req.body);
    const pkg = await packageService.update(String(req.params.id), dto);
    res.status(200).json(pkg);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await packageService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
