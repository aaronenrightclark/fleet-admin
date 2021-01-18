import { Component } from '@angular/core';
import { FleetAdminFacade } from 'src/app/facades/fleet-admin.facade';
import { Vehicle } from 'src/app/models/fleet.model';

@Component({
  selector: 'app-fleet-admin',
  templateUrl: './fleet-admin.component.html',
  styleUrls: ['./fleet-admin.component.scss'],
})
export class FleetAdminComponent {
  showList = false;
  showMap = false;

  constructor(private fleetAdminFacade: FleetAdminFacade) {}

  showOnMap(vehicle: Vehicle) {
    if (!this.showMap) {
      this.showMap = true;
    }
    this.fleetAdminFacade.setSelectedVehicle(vehicle);
  }
}
