import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RootApiService } from 'libs/services/src/lib/api/root-api.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class RestCitiesService<T> extends RootApiService {
  constructor(
    @Inject(String) apiHost: string,
    @Inject(String) endpoint: string,
    httpClient: HttpClient
  ) {
    super(apiHost, endpoint, httpClient);
  }

  protected citiesPOST(country: string): Observable<T> {
    const requestOption: HttpRequest<unknown> = new HttpRequest(
      'POST',
      '',
      { country },
      {
        withCredentials: false,
        responseType: 'json',
        reportProgress: false,
      }
    );
    return this.apiRequest<T>(requestOption);
  }
}
