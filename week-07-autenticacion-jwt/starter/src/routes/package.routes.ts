import { Router } from 'express';
import * as packageController from '../controllers/package.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

// Todas las rutas de este router requieren autenticación
router.use(authMiddleware);

// GET /api/v1/packages — listar todos
router.get('/', packageController.getAll);

// GET /api/v1/packages/:id — obtener uno por ID
router.get('/:id', packageController.getById);

// POST /api/v1/packages — crear uno nuevo
router.post('/', packageController.create);

// PATCH /api/v1/packages/:id — actualizar parcialmente
router.patch('/:id', packageController.update);

// DELETE /api/v1/packages/:id — eliminar
router.delete('/:id', packageController.remove);

export default router;
