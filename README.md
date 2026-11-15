# Личные заметки (неделя 10): регистрация и вход через JWT

React (Vite) + Node.js/Express + SQLite (Prisma).

## Быстрый запуск

- **Windows:** двойной клик по `start.bat`
- **Mac/Linux:** `./start.sh`

Скрипт сам установит всё, создаст базу, запустит сервер и клиент и откроет сайт.

## Запуск вручную

Нужен Node.js 18+. Открой **два терминала**.

### 1. Сервер
```bash
cd server
npm install
cp .env.example .env        # на Windows: copy .env.example .env
npx prisma migrate dev --name init
npm run dev
```
Сервер: http://localhost:3000 (GET / вернёт `{ "message": "Сервер работает!" }`).

### 2. Клиент
```bash
cd client
npm install
npm run dev
```
Сайт: http://localhost:5173

## Эндпоинты

| Метод | Путь | Описание | Токен |
|-------|------|----------|-------|
| POST | /auth/register | `{ email, password }`, ответ 201 | нет |
| POST | /auth/login | возвращает `{ token }` | нет |
| GET | /notes | мои заметки | да |
| POST | /notes | `{ title, text }`, ответ 201 | да |
| GET | /notes/:id | одна заметка, 404 если чужая/нет | да |
| PUT | /notes/:id | обновить | да |
| DELETE | /notes/:id | удалить, ответ 204 | да |

## Примеры curl
```bash
curl -X POST localhost:3000/auth/register -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"123456"}'
curl -X POST localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"a@a.com","password":"123456"}'
curl localhost:3000/notes -H "Authorization: Bearer ВАШ_ТОКЕН"
```

## Демо для сдачи
1. Зарегистрируй `anna@test.com`, добавь 2 заметки, нажми «Выйти».
2. Зарегистрируй `boris@test.com`: список пуст, добавь свою заметку.
3. Войди снова под Анной: видны только её заметки.
