import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICitiesApiResponse, REST_CITIES_API_HOST } from '@lib-services';
import { RestCitiesService } from './rest-cities-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class CitiesApiService extends RestCitiesService<ICitiesApiResponse> {
  constructor(
    @Inject(REST_CITIES_API_HOST) apiHost: string,
    httpClient: HttpClient
  ) {
    super(apiHost, '/cities', httpClient);
  }

  fetchCitiesByCountry(countryName: string): Observable<ICitiesApiResponse> {
    return this.citiesPOST(countryName);
  }
}
