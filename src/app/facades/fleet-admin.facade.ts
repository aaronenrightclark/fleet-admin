import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Vehicle } from '../models/fleet.model';
import { FleetAdminService } from '../services/fleet-admin.service';

@Injectable({
  providedIn: 'root',
})
export class FleetAdminFacade {
  private readonly _vehicles = new BehaviorSubject<Vehicle[]>([]);
  public vehicles$: Observable<Vehicle[]>;

  private readonly _selectedVehicle = new BehaviorSubject<Vehicle>(null);
  public selectedVehicle$: Observable<Vehicle>;

  constructor(private fleetAdminService: FleetAdminService) {
    this.vehicles$ = this._vehicles.asObservable();
    this.selectedVehicle$ = this._selectedVehicle.asObservable();
  }

  getVehicles(): Observable<boolean> {
    const responseSubject = new Subject<boolean>();
    this.fleetAdminService.getFleetVehicles().subscribe({
      next: (vehicles) => {
        this._vehicles.next(vehicles);
        responseSubject.next(true);
      },
      error: (err) => {
        console.error('Error occurred fetching fleet vehicles.', err);
        responseSubject.next(false);
      },
    });
    return responseSubject.asObservable();
  }

  setSelectedVehicle(vehicle: Vehicle): void {
    this._selectedVehicle.next(vehicle);
  }
}
