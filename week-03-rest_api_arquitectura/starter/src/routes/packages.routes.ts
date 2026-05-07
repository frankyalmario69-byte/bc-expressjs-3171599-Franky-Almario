// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================

import { Router } from 'express';
import * as controller from '../controllers/packages.controller';

export const packagesRouter = Router();

packagesRouter.get('/', controller.getAll);
packagesRouter.get('/:id', controller.getById);
packagesRouter.post('/', controller.create);
packagesRouter.put('/:id', controller.update);
packagesRouter.delete('/:id', controller.remove);
