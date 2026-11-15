const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getToken = () => localStorage.getItem('token');
export const saveToken = (t) => localStorage.setItem('token', t);
export const logout = () => localStorage.removeItem('token');

// Обёртка над fetch: сама добавляет токен к каждому запросу
export async function api(path, options = {}) {
  const token = getToken();

  const res = await fetch(API + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // БОНУС: токен просрочен -> удаляем его и отправляем на вход
  if (res.status === 401 && token) {
    logout();
    window.location.href = '/login';
    throw new Error('Сессия истекла, войдите снова');
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}
