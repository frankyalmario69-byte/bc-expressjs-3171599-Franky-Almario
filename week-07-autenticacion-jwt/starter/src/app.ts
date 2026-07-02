import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import packageRouter from './routes/package.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas del recurso principal: Paquetes (Empresa de mensajería)
app.use('/api/v1/packages', packageRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
