// frontend/src/App.jsx
import React, { useState } from 'react';
import MapView from './MapView';

export default function App() {
  const [path, setPath] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function runAlgorithm() {
    setLoading(true);
    try {
      const res = await fetch('/route');
      const { path: p, tasks: t } = await res.json();
      setPath(p);
      setTasks(t);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch route');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={runAlgorithm}
        disabled={loading}
        style={{ margin: '1rem', padding: '0.5rem 1rem' }}
      >
        {loading ? 'Running…' : 'Run Algorithm'}
      </button>
      <MapView path={path} tasks={tasks} />
    </div>
  );
}
