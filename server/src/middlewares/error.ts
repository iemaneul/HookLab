import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) { res.status(400).json({ error: { message: err.issues[0]?.message || 'Invalid input', details: err.flatten() } }); return; }
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(message.includes('not found') ? 404 : 500).json({ error: { message } });
};
