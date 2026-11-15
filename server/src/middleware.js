import jwt from 'jsonwebtoken';

// Защита маршрутов: пропускаем только запросы с верным токеном
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Нужен токен' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId; // дальше знаем, чей это запрос
    next();
  } catch {
    // токен подделан или просрочен
    res.status(401).json({ error: 'Токен недействителен или просрочен' });
  }
}
