import { Injectable, signal, computed } from '@angular/core';
import { Vehicle, VehicleCreate, VehicleUpdate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesSignal = signal<Vehicle[]>([
    {
      id: '1',
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2023,
      placa: 'ABC-1234',
      cor: 'Prata'
    },
    {
      id: '2',
      marca: 'Honda',
      modelo: 'Civic',
      ano: 2022,
      placa: 'DEF-5678',
      cor: 'Preto'
    },
    {
      id: '3',
      marca: 'Volkswagen',
      modelo: 'Golf',
      ano: 2024,
      placa: 'GHI-9012',
      cor: 'Branco'
    }
  ]);

  readonly vehicles = this.vehiclesSignal.asReadonly();
  readonly vehicleCount = computed(() => this.vehiclesSignal().length);

  getById(id: string): Vehicle | undefined {
    return this.vehiclesSignal().find(v => v.id === id);
  }

  create(data: VehicleCreate): Vehicle {
    const newVehicle: Vehicle = {
      ...data,
      id: this.generateId()
    };

    this.vehiclesSignal.update(vehicles => [...vehicles, newVehicle]);
    return newVehicle;
  }

  update(id: string, data: VehicleUpdate): Vehicle | null {
    const index = this.vehiclesSignal().findIndex(v => v.id === id);

    if (index === -1) {
      return null;
    }

    const updatedVehicle: Vehicle = {
      ...this.vehiclesSignal()[index],
      ...data
    };

    this.vehiclesSignal.update(vehicles => {
      const updated = [...vehicles];
      updated[index] = updatedVehicle;
      return updated;
    });

    return updatedVehicle;
  }

  delete(id: string): boolean {
    const initialLength = this.vehiclesSignal().length;
    this.vehiclesSignal.update(vehicles => vehicles.filter(v => v.id !== id));
    return this.vehiclesSignal().length < initialLength;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

