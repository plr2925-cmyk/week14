# Публикация (неделя 14)

## Данные для Render (бэкенд)
- Root Directory: `server`
- Build Command: `npm install && npx prisma generate && npx prisma db push`
- Start Command: `npm start`
- Instance type: Free
- Environment variables:
  - `DATABASE_URL` = `file:./prod.db`
  - `JWT_SECRET` = любая длинная случайная строка
  - `CLIENT_URL` = ссылка на сайт с Vercel (без `/` в конце), добавляется после шага с Vercel

## Данные для Vercel (фронтенд)
- Root Directory: `client`
- Framework Preset: Vite
- Environment variable: `VITE_API_URL` = ссылка на бэкенд с Render (без `/` в конце)

## Важно
- На бесплатном Render сервер «засыпает» без запросов, первый запрос после паузы идёт около минуты.
- База SQLite на бесплатном Render может очищаться при перезапуске сервера. Для демо это нормально: зарегистрируйся заново.
