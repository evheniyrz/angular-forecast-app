import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CountriesApiResponse, REST_COUNTRIES_API_HOST } from '@lib-services';
import { CountriesApiService } from './countries-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class RestCountriesService extends CountriesApiService<
  CountriesApiResponse[]
> {
  constructor(
    @Inject(REST_COUNTRIES_API_HOST) apiHost: string,
    httpClient: HttpClient
  ) {
    super(apiHost, '/countries', httpClient);
  }

  getCountryByName(countryName: string): Observable<CountriesApiResponse[]> {
    return this.countryGet(countryName);
  }
}
