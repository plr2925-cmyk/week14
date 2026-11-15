import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth.jsx';
import Notes from './pages/Notes.jsx';
import { getToken } from './api.js';

// Без токена на страницу заметок не пускаем
function Protected({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Protected><Notes /></Protected>} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/register" element={<Auth mode="register" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
