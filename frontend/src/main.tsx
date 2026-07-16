import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './styles.css';


const API_URL =
  import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

function App() {
  const [status, setStatus] = React.useState('Not checked');

  const checkBackend = async () => {
  try {
    console.log("Calling backend:", `${API_URL}/health`);

    const response = await axios.get(`${API_URL}/health`);

    console.log("Backend response:", response.data);
    setStatus(response.data.message);
  } catch (error) {
    console.error("Backend connection error:", error);
    setStatus("Backend is unavailable");
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
