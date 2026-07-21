import { useState } from "react";
import axios from "axios";

import VehicleDescriptionForm from "./components/VehicleDescriptionForm";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export default function App() {
  const [status, setStatus] = useState("Not checked");

  const checkBackend = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/health`,
      );

      setStatus(response.data.message);
    } catch (error) {
      console.error(
        "Backend connection failed:",
        error,
      );

      setStatus("Backend is unavailable");
    }
  };

  return (
    <main className="page">
      <section className="card">
        <span className="badge">
          AI Developer Project
        </span>

        <h1>VehicleMind AI</h1>

        <p>
          Generate professional vehicle listing
          descriptions using FastAPI and Gemini.
        </p>

        <button
          type="button"
          onClick={checkBackend}
        >
          Check FastAPI connection
        </button>

        <p className="status">
          Backend status: <strong>{status}</strong>
        </p>

        <hr />

        <VehicleDescriptionForm />
      </section>
    </main>
  );
}