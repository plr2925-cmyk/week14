import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

if (!process.env.JWT_SECRET) {
  console.error('Нет JWT_SECRET в .env — скопируй .env.example в .env');
  process.exit(1);
}

const app = express();

// CORS: принимаем запросы только с адреса фронтенда
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Каждый запрос выводим в консоль
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => res.json({ message: 'Сервер работает!' }));
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер: http://localhost:${PORT}`));
