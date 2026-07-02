import express from 'express';
import secondaryRouter from './routes/secondary.routes';
import primaryRouter from './routes/primary.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/customers', secondaryRouter);
app.use('/api/v1/packages', primaryRouter);

app.use(notFound);
app.use(errorHandler);
