export interface Vehicle {
  id: number;
  location: VehicleLocation;
  fuelLevel: number;
}

// uses string to preserve precision
export interface VehicleLocation {
  lat: string;
  lng: string;
}
