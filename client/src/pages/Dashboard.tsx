import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Project } from '../types/Project';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newRepo, setNewRepo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => {
        alert('Not authorized');
        navigate('/');
      });
  }, []);

  const handleAdd = async () => {
    if (!newRepo.trim()) return;
    try {
      await API.post('/projects', { path: newRepo.trim() });
      setNewRepo('');
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      alert('Failed to add repository');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>GitHub Projects</h2>

      <div>
        <input
          type="text"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="e.g. facebook/react"
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ul>
        {projects.map(p => (
          <li key={p.id} style={{ marginTop: '1rem' }}>
            <strong>{p.owner}/{p.name}</strong><br />
            ⭐ {p.stars} | 🍴 {p.forks} | 🐞 {p.issues} | 🕒 {p.createdAt}<br />
            🔗 <a href={p.url} target="_blank" rel="noreferrer">{p.url}</a><br />
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
