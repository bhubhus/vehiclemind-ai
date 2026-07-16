export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  kilometres: number;
  fuel_type: string;
  body_type: string | null;
  seats: number | null;
  description: string | null;
}

export interface VehicleCreate {
  make: string;
  model: string;
  year: number;
  price: number;
  kilometres: number;
  fuel_type: string;
  body_type: string;
  seats: number;
  description: string;
}