export interface Vehicle {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
}

export type VehicleCreate = Omit<Vehicle, 'id'>;
export type VehicleUpdate = Partial<VehicleCreate>;

