import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ICountriesApiResponse, REST_COUNTRIES_API_HOST } from '@lib-services';
import { RestCountriesService } from './rest-countries.service';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesApiService extends RestCountriesService<
  ICountriesApiResponse[]
> {
  constructor(
    @Inject(REST_COUNTRIES_API_HOST) apiHost: string,
    httpClient: HttpClient
  ) {
    super(apiHost, '/countries', httpClient);
  }

  getCountries(countryName: string): Observable<ICountriesApiResponse[]> {
    return this.countryGet(countryName);
  }
}
