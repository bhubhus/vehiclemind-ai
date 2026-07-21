import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export interface VehicleDescriptionInput {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuel_type?: string;
  color?: string;
  features: string[];
}

export interface VehicleDescriptionResponse {
  description: string;
}

export async function generateVehicleDescription(
  vehicle: VehicleDescriptionInput,
): Promise<VehicleDescriptionResponse> {
  const response =
    await axios.post<VehicleDescriptionResponse>(
      `${API_URL}/ai/generate-description`,
      vehicle,
    );

  return response.data;
}