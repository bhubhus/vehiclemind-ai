import { FormEvent, useEffect, useState } from "react";

import {
  createVehicle,
  deleteVehicle,
  getVehicles,
} from "./services/vehicleApi";

import type {
  Vehicle,
  VehicleCreate,
} from "./types/vehicle";

import "./styles.css";

const initialForm: VehicleCreate = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  kilometres: 0,
  fuel_type: "",
  body_type: "",
  seats: 5,
  description: "",
};

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState<VehicleCreate>(initialForm);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  async function loadVehicles() {
    try {
      setLoading(true);
      setMessage("");

      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load vehicles"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  function updateField(
    field: keyof VehicleCreate,
    value: string | number
  ) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const createdVehicle = await createVehicle(form);

      setVehicles((previousVehicles) => [
        createdVehicle,
        ...previousVehicles,
      ]);

      setForm(initialForm);
      setMessage("Vehicle added successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to add vehicle"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(vehicleId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVehicle(vehicleId);

      setVehicles((previousVehicles) =>
        previousVehicles.filter(
          (vehicle) => vehicle.id !== vehicleId
        )
      );

      setMessage("Vehicle deleted successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete vehicle"
      );
    }
  }

  return (
    <main className="page">
      <header className="header">
        <div>
          <span className="badge">AI Developer Project</span>
          <h1>VehicleMind AI</h1>
          <p>
            Add and manage vehicles before connecting the first AI
            feature.
          </p>
        </div>
      </header>

      {message && <div className="message">{message}</div>}

      <section className="layout">
        <div className="panel">
          <h2>Add Vehicle</h2>

          <form className="vehicle-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Make
                <input
                  value={form.make}
                  onChange={(event) =>
                    updateField("make", event.target.value)
                  }
                  placeholder="Hyundai"
                  required
                />
              </label>

              <label>
                Model
                <input
                  value={form.model}
                  onChange={(event) =>
                    updateField("model", event.target.value)
                  }
                  placeholder="Ioniq 5"
                  required
                />
              </label>

              <label>
                Year
                <input
                  type="number"
                  value={form.year}
                  onChange={(event) =>
                    updateField(
                      "year",
                      Number(event.target.value)
                    )
                  }
                  min="1900"
                  max="2100"
                  required
                />
              </label>

              <label>
                Price
                <input
                  type="number"
                  value={form.price}
                  onChange={(event) =>
                    updateField(
                      "price",
                      Number(event.target.value)
                    )
                  }
                  min="1"
                  required
                />
              </label>

              <label>
                Kilometres
                <input
                  type="number"
                  value={form.kilometres}
                  onChange={(event) =>
                    updateField(
                      "kilometres",
                      Number(event.target.value)
                    )
                  }
                  min="0"
                  required
                />
              </label>

              <label>
                Fuel Type
                <select
                  value={form.fuel_type}
                  onChange={(event) =>
                    updateField("fuel_type", event.target.value)
                  }
                  required
                >
                  <option value="">Select fuel type</option>
                  <option value="Electric">Electric</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>

              <label>
                Body Type
                <select
                  value={form.body_type}
                  onChange={(event) =>
                    updateField("body_type", event.target.value)
                  }
                >
                  <option value="">Select body type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Wagon">Wagon</option>
                </select>
              </label>

              <label>
                Seats
                <input
                  type="number"
                  value={form.seats}
                  onChange={(event) =>
                    updateField(
                      "seats",
                      Number(event.target.value)
                    )
                  }
                  min="1"
                  max="20"
                />
              </label>
            </div>

            <label>
              Description
              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Enter basic vehicle information"
                rows={4}
              />
            </label>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Vehicle"}
            </button>
          </form>
        </div>

        <div className="panel">
          <div className="list-header">
            <h2>Vehicles</h2>

            <button
              type="button"
              className="secondary-button"
              onClick={loadVehicles}
            >
              Refresh
            </button>
          </div>

          {loading && <p>Loading vehicles...</p>}

          {!loading && vehicles.length === 0 && (
            <p>No vehicles have been added.</p>
          )}

          <div className="vehicle-list">
            {vehicles.map((vehicle) => (
              <article className="vehicle-card" key={vehicle.id}>
                <div>
                  <h3>
                    {vehicle.make} {vehicle.model}
                  </h3>

                  <p>
                    {vehicle.year} · {vehicle.fuel_type} ·{" "}
                    {vehicle.kilometres.toLocaleString()} km
                  </p>

                  <p>
                    <strong>
                      €{vehicle.price.toLocaleString()}
                    </strong>
                  </p>

                  {vehicle.description && (
                    <p>{vehicle.description}</p>
                  )}
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;