import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FleetListComponent } from './components/fleet-list/fleet-list.component';
import { FleetMapComponent } from './components/fleet-map/fleet-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FleetAdminComponent } from './components/fleet-admin/fleet-admin.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FleetAdminComponent,
    FleetListComponent,
    FleetMapComponent,
    VehicleDetailsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
