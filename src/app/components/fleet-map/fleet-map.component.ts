import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { FleetAdminFacade } from 'src/app/facades/fleet-admin.facade';
import { Vehicle, VehicleLocation } from 'src/app/models/fleet.model';
import { MapLoaderService } from 'src/app/services/map-loader.service';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.scss'],
})
export class FleetMapComponent implements OnInit, OnDestroy {
  DEFAULT_CENTER = { lat: 24, lng: 12 };

  center: google.maps.LatLngLiteral = this.DEFAULT_CENTER;
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChildren(MapMarker) mapMarkers: MapMarker[];

  apiLoaded: Observable<boolean>;

  vehicles: Vehicle[];
  selectedVehicle: Vehicle;

  // subscribe selected separately as info windows are frequently created and destroyed
  selectedVehicleSubscription: Subscription;
  vehiclesSubscription: Subscription;

  constructor(
    private fleetAdminFacade: FleetAdminFacade,
    private mapLoaderService: MapLoaderService
  ) {
    this.apiLoaded = this.mapLoaderService.loadMap();
  }

  ngOnInit(): void {
    this.vehiclesSubscription = combineLatest([
      this.fleetAdminFacade.getVehicles().pipe(filter((result) => !!result)),
      this.fleetAdminFacade.vehicles$,
    ])
      .pipe(
        tap(() => this.resetMap()),
        tap(([, vehicles]) => {
          this.vehicles = vehicles;
          this.vehicles.forEach((vehicle) => this.addVehicleMarker(vehicle));
          this.center = this.getSimpleCenter(this.vehicles);
        }),
        withLatestFrom(this.fleetAdminFacade.selectedVehicle$),
        tap(([, selected]) => {
          console.log('ajec: tapped: ', selected);
          if (selected) {
            this.selectedVehicle = selected;
            const selectedMarker = this.mapMarkers.find((marker) => {
              const markerPosition = marker.getPosition();
              const { lat, lng } = this.parseVehicleLocation(
                this.selectedVehicle.location
              );
              return (
                lat === markerPosition.lat() && lng === markerPosition.lng()
              );
            });
            this.openInfoWindow(selectedMarker);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.vehiclesSubscription?.unsubscribe();
    this.selectedVehicleSubscription?.unsubscribe();
  }

  subscribeSelected(): void {
    this.selectedVehicleSubscription = this.fleetAdminFacade.selectedVehicle$.subscribe(
      {
        next: (selected) => {
          if (selected) {
            this.selectedVehicle = selected;
            const selectedMarker = this.mapMarkers.find((marker) => {
              const markerPosition = marker.getPosition();
              const { lat, lng } = this.parseVehicleLocation(
                this.selectedVehicle.location
              );
              return (
                lat === markerPosition.lat() && lng === markerPosition.lng()
              );
            });
            this.openInfoWindow(selectedMarker);
          }
        },
      }
    );
  }

  mapMarkerClicked(marker: MapMarker) {
    console.log('ajec: map marker clicked: ', marker);
    const markedVehicle = this.vehicles.find((vehicle) => {
      const markerPosition = marker.getPosition();
      const { lat, lng } = this.parseVehicleLocation(vehicle.location);
      console.log(
        'ajec: checking... ',
        { lat, lng },
        { markerLat: markerPosition.lat(), markerLng: markerPosition.lng() }
      );
      return lat === markerPosition.lat() && lng === markerPosition.lng();
    });
    console.log('ajec: setting selected: ', markedVehicle);
    this.fleetAdminFacade.setSelectedVehicle(markedVehicle);
    this.openInfoWindow(marker);
  }

  infoWindowClosed(): void {
    this.fleetAdminFacade.setSelectedVehicle(null);
    // clean up subscription
    this.selectedVehicleSubscription?.unsubscribe();
  }

  private openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  private parseVehicleLocation(
    loc: VehicleLocation
  ): google.maps.LatLngLiteral {
    return { lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) };
  }

  private resetMap(): void {
    this.selectedVehicleSubscription?.unsubscribe();
    this.infoWindow?.close();
    this.center = this.DEFAULT_CENTER;
    this.markerPositions = [];
  }

  private addVehicleMarker(vehicle: Vehicle) {
    this.markerPositions.push(this.parseVehicleLocation(vehicle.location));
  }

  private getSimpleCenter(vehicles: Vehicle[]): google.maps.LatLngLiteral {
    const { latSum, lngSum } = vehicles.reduce(
      (sums, vehicle) => {
        const { lat, lng } = this.parseVehicleLocation(vehicle.location);
        return {
          latSum: sums.latSum + lat,
          lngSum: sums.lngSum + lng,
        };
      },
      { latSum: 0, lngSum: 0 }
    );
    return {
      lat: latSum / vehicles.length,
      lng: lngSum / vehicles.length,
    };
  }
}
