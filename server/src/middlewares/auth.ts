import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import type { AuthRequest } from '../types.js';
export async function auth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    if (!token) return res.status(401).json({ error: { message: 'Authentication required' } });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'development-only-secret') as { sub: string };
    const workspace = await prisma.workspace.findFirst({ where: { userId: payload.sub } });
    if (!workspace) return res.status(401).json({ error: { message: 'Invalid session' } });
    req.user = { id: payload.sub, workspaceId: workspace.id }; next();
  } catch { return res.status(401).json({ error: { message: 'Invalid or expired token' } }); }
}
