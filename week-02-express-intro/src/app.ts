import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { itemsRouter } from './routes/items.routes.js';

export function createApp(): Application {
  const app = express();

  // 1. Parseo de body JSON
  app.use(express.json());

  // 2. Logger de peticiones
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // 3. Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // 4. Rutas de paquetes
  app.use('/api/v1/packages', itemsRouter);

  // 5. Rutas no encontradas
  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // 6. Error handler global
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });

  return app;
}
