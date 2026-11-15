import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../middleware.js';

const router = Router();
router.use(requireAuth); // все маршруты ниже защищены

// GET /notes — только мои заметки
router.get('/', async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.userId },
    orderBy: { id: 'desc' },
  });
  res.json(notes);
});

// POST /notes
router.post('/', async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Нужны title и text' });
  }
  const note = await prisma.note.create({
    data: { title, text, userId: req.userId },
  });
  res.status(201).json(note);
});

// Ищем заметку по id только среди заметок текущего пользователя
async function findMine(req) {
  return prisma.note.findFirst({
    where: { id: Number(req.params.id), userId: req.userId },
  });
}

// GET /notes/:id
router.get('/:id', async (req, res) => {
  const note = await findMine(req);
  if (!note) return res.status(404).json({ error: 'Заметка не найдена' });
  res.json(note);
});

// PUT /notes/:id
router.put('/:id', async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Нужны title и text' });
  }
  const note = await findMine(req);
  if (!note) return res.status(404).json({ error: 'Заметка не найдена' });

  const updated = await prisma.note.update({
    where: { id: note.id },
    data: { title, text },
  });
  res.json(updated);
});

// DELETE /notes/:id
router.delete('/:id', async (req, res) => {
  const note = await findMine(req);
  if (!note) return res.status(404).json({ error: 'Заметка не найдена' });

  await prisma.note.delete({ where: { id: note.id } });
  res.status(204).end();
});

export default router;
