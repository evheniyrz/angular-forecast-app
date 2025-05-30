import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CitiesApiResponse, REST_CITIES_API_HOST } from '@lib-services';
import { CitiesApiSertvice } from './cities-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class RestCitiesService extends CitiesApiSertvice<CitiesApiResponse> {
  constructor(
    @Inject(REST_CITIES_API_HOST) apiHost: string,
    httpClient: HttpClient
  ) {
    super(apiHost, '/cities', httpClient);
  }

  citiesByCountry(countryName: string): Observable<CitiesApiResponse> {
    return this.citiesPOST(countryName);
  }
}
