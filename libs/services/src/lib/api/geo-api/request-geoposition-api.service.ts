import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RootApiService } from 'libs/services/src/lib/api/root-api.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class RequestGeopositionApiService<T> extends RootApiService {
  constructor(
    @Inject(String) apiHost: string,
    @Inject(String) endpoint: string,
    httpClient: HttpClient
  ) {
    super(apiHost, endpoint, httpClient);
  }

  protected getGeoPosition(): Observable<T> {
    const params = this.generateGetRequestParams({
      fields: 'country,city,city_geoname_id,region,country_code',
    });
    const requestOption: HttpRequest<unknown> = new HttpRequest('GET', '', {
      // params,
      withCredentials: true,
      responseType: 'json',
      observe: 'body',
      reportProgress: false,
    });

    return this.apiRequest<T>(requestOption);
  }
}
