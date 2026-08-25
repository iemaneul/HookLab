import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { credentialsSchema } from '../schemas/index.js';
import { auth } from '../middlewares/auth.js';
import type { AuthRequest } from '../types.js';
const router = Router();
const tokenFor = (id: string) => jwt.sign({}, process.env.JWT_SECRET || 'development-only-secret', { subject: id, expiresIn: '7d' });
router.post('/register', async (req, res) => {
  const data = credentialsSchema.extend({ name: credentialsSchema.shape.name.unwrap() }).parse(req.body);
  if (await prisma.user.findUnique({ where: { email: data.email } })) return res.status(409).json({ error: { message: 'Email already registered' } });
  const user = await prisma.user.create({ data: { name: data.name, email: data.email.toLowerCase(), passwordHash: await bcrypt.hash(data.password, 12), workspaces: { create: { name: `${data.name}'s Workspace` } } } });
  res.status(201).json({ data: { token: tokenFor(user.id), user: { id: user.id, name: user.name, email: user.email } } });
});
router.post('/login', async (req, res) => {
  const data = credentialsSchema.omit({ name: true }).parse(req.body); const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ error: { message: 'Invalid email or password' } });
  res.json({ data: { token: tokenFor(user.id), user: { id: user.id, name: user.name, email: user.email } } });
});
router.get('/me', auth, async (req: AuthRequest, res) => { const user = await prisma.user.findUnique({ where: { id: req.user!.id }, select: { id: true, name: true, email: true, workspaces: { take: 1 } } }); res.json({ data: user }); });
export default router;
