import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FUEL_INDICATORS } from 'src/app/constants/fleet.constants';
import { Vehicle } from '../../models/fleet.model';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
})
export class VehicleDetailsComponent implements OnInit {
  fuelClass;

  @Input() vehicle: Vehicle;
  @Input() mapView: false;
  @Input() isSelected: false;
  @Output() showOnMap = new EventEmitter<Vehicle>();

  constructor() {}

  ngOnInit(): void {
    if (this.vehicle) {
      console.log('ajec: initializing details comp: ', this.vehicle);
      this.fuelClass =
        this.vehicle.fuelLevel < FUEL_INDICATORS.NORMAL
          ? this.vehicle.fuelLevel < FUEL_INDICATORS.LOW
            ? 'alert'
            : 'warn'
          : 'normal';
    }
  }
}
