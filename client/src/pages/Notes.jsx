import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, logout } from '../api.js';

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // Загружаем заметки при открытии страницы
  useEffect(() => {
    api('/notes').then(setNotes).catch((e) => setError(e.message));
  }, []);

  async function addNote(e) {
    e.preventDefault();
    setError('');
    try {
      const note = await api('/notes', {
        method: 'POST',
        body: JSON.stringify({ title, text }),
      });
      setNotes([note, ...notes]);
      setTitle('');
      setText('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteNote(id) {
    try {
      await api(`/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    logout(); // удаляем токен
    navigate('/login'); // и возвращаем на вход
  }

  return (
    <div className="card wide">
      <div className="row">
        <h1>Мои заметки</h1>
        <button className="secondary" onClick={handleLogout}>Выйти</button>
      </div>

      <form onSubmit={addNote}>
        <input placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Текст заметки" value={text} onChange={(e) => setText(e.target.value)} required />
        <button>Добавить</button>
      </form>

      {error && <p className="error">{error}</p>}

      {notes.length === 0 && <p className="muted">Пока нет заметок</p>}
      {notes.map((n) => (
        <div className="note" key={n.id}>
          <div>
            <b>{n.title}</b>
            <p>{n.text}</p>
          </div>
          <button className="secondary" onClick={() => deleteNote(n.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
