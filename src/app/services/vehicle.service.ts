import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Vehicle, VehicleCreate, VehicleUpdate } from '../pages/vehicles/models';

import { API_CONFIG, ApiConfig } from '@app/core/config/index';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject<ApiConfig>(API_CONFIG);

  private readonly apiUrl = `${this.apiConfig.baseUrl}/vehicles`;

  private readonly vehiclesSignal = signal<Vehicle[]>([]);

  readonly vehicles = this.vehiclesSignal.asReadonly();
  readonly vehicleCount = computed(() => this.vehiclesSignal().length);

  constructor() {
    this.loadVehicles();
  }

  private loadVehicles(): void {
    this.http.get<Vehicle[]>(this.apiUrl).subscribe((vehicles) => {
      this.vehiclesSignal.set(vehicles);
    });
  }

  getById(id: string): Vehicle | undefined {
    return this.vehiclesSignal().find((v) => v.id === id);
  }

  create(data: VehicleCreate): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, data).pipe(
      tap((newVehicle) => {
        this.vehiclesSignal.update((vehicles) => [...vehicles, newVehicle]);
      }),
    );
  }

  update(id: string, data: VehicleUpdate): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.apiUrl}/${id}`, data).pipe(
      tap((updatedVehicle) => {
        this.vehiclesSignal.update((vehicles) =>
          vehicles.map((v) => (v.id === id ? updatedVehicle : v)),
        );
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.vehiclesSignal.update((vehicles) => vehicles.filter((v) => v.id !== id));
      }),
    );
  }
}
