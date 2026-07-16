import type { Vehicle, VehicleCreate } from "../types/vehicle";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_URL}/vehicles`);

  if (!response.ok) {
    throw new Error("Unable to load vehicles");
  }

  return response.json();
}

export async function createVehicle(
  vehicle: VehicleCreate
): Promise<Vehicle> {
  const response = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.detail || "Unable to create vehicle"
    );
  }

  return response.json();
}

export async function deleteVehicle(
  vehicleId: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/vehicles/${vehicleId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete vehicle");
  }
}