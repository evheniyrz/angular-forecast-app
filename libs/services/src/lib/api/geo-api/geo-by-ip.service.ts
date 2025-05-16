import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GEO_LOCATION_HOST, ResolvedGeoData } from '@lib-services';
import { RequestGeopositionApiService } from 'libs/services/src/lib/api/geo-api/request-geoposition-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoByIpService extends RequestGeopositionApiService<ResolvedGeoData> {
  constructor(
    @Inject(GEO_LOCATION_HOST) dataHost: string,
    httpClientEnt: HttpClient
  ) {
    super(dataHost, '/geo', httpClientEnt);
  }

  getLocation(): Observable<ResolvedGeoData> {
    return this.getGeoPosition();
  }
}
