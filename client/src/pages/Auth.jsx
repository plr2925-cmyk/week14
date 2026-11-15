import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, saveToken } from '../api.js';

export default function Auth({ mode }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!isLogin) {
        await api('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
      }
      // после регистрации сразу входим
      const { token } = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      saveToken(token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль (минимум 6 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? '...' : isLogin ? 'Войти' : 'Создать аккаунт'}</button>
      </form>
      <p className="muted">
        {isLogin ? (
          <>Нет аккаунта? <Link to="/register">Регистрация</Link></>
        ) : (
          <>Уже есть аккаунт? <Link to="/login">Войти</Link></>
        )}
      </p>
    </div>
  );
}
