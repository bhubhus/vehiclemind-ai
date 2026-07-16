import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './styles.css';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

function App() {
  const [status, setStatus] = React.useState('Not checked');

  const checkBackend = async () => {
    try {
      const response = await axios.get(`${API_URL}health`);
      setStatus(response.data.message);
    } catch {
      setStatus('Backend is unavailable');
    }
  };

  return (
    <main className="page">
      <section className="card">
        <span className="badge">AI Developer Project</span>
        <h1>VehicleMind AI</h1>
        <p>
          An intelligent vehicle platform for natural-language search,
          document Q&A, recommendations, image analysis, and listing generation.
        </p>
        <button onClick={checkBackend}>Check FastAPI connection</button>
        <p className="status">Backend status: <strong>{status}</strong></p>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
