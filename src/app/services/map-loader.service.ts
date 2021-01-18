import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MapLoaderService {
  // TODO: read from config
  apiKey = 'AIzaSyB8Yo9S1qWTJEhsvIlv-LhqZmLa_Ov7v38';

  constructor(private httpClient: HttpClient) {}

  loadMap(): Observable<boolean> {
    return this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError((err) => {
          console.error('Error loading Google Map.', err);
          return of(false);
        })
      );
  }
}
