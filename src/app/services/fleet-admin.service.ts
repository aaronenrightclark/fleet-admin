import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehicle } from '../models/fleet.model';

@Injectable({
  providedIn: 'root',
})
export class FleetAdminService {
  MOCK_FLEET: Vehicle[] = [
    {
      id: 123,
      location: { lat: '34.04481193948737', lng: '-84.32980177414667' },
      fuelLevel: 90,
    },
    {
      id: 234,
      location: { lat: '33.921437213905136', lng: '-84.33524720789066' },
      fuelLevel: 10,
    },
    {
      id: 345,
      location: { lat: '33.763566693727846', lng: '-84.39460894770852' },
      fuelLevel: 40,
    },
    {
      id: 456,
      location: { lat: '33.77237849905646', lng: '-84.38924453152434' },
      fuelLevel: 20,
    },
    {
      id: 567,
      location: { lat: '34.04481193948737', lng: '-84.32980177414667' },
      fuelLevel: 80,
    },
    {
      id: 678,
      location: { lat: '33.84145711944916', lng: '-84.36940553946359' },
      fuelLevel: 60,
    },
  ];

  constructor() {}

  getFleetVehicles(): Observable<Vehicle[]> {
    console.log('ajec: returning fleet vehicles: ', this.MOCK_FLEET);
    return of(this.MOCK_FLEET).pipe(delay(200));
  }
}
