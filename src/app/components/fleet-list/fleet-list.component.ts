import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Vehicle } from '../../models/fleet.model';
import { combineLatest, Observable } from 'rxjs';
import { FleetAdminFacade } from 'src/app/facades/fleet-admin.facade';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss'],
})
export class FleetListComponent implements OnInit {
  @Output() showOnMap = new EventEmitter<Vehicle>();

  fleetVehicles$: Observable<Vehicle[]>;
  selectedVehicle$: Observable<Vehicle>;

  constructor(private fleetAdminFacade: FleetAdminFacade) {
    this.selectedVehicle$ = this.fleetAdminFacade.selectedVehicle$;
  }

  ngOnInit(): void {
    this.fleetVehicles$ = combineLatest([
      this.fleetAdminFacade.getVehicles().pipe(filter((result) => !!result)),
      this.fleetAdminFacade.vehicles$,
    ]).pipe(map(([, vehicles]) => vehicles));
  }
}
