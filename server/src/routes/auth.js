import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

const router = Router();

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль минимум 6 символов' });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ error: 'Такой email уже зарегистрирован' });
  }

  // Пароль хранится только в виде хеша
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });

  // Пароль в ответ не отдаём
  res.status(201).json({ id: user.id, email: user.email });
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = email && (await prisma.user.findUnique({ where: { email } }));
  const ok = user && password && (await bcrypt.compare(password, user.password));

  if (!ok) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
});

export default router;
