import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CountryEnum } from '@lib-pipes';
import { RootApiService } from 'libs/services/src/lib/api/root-api.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class RestCountriesService<T> extends RootApiService {
  constructor(
    @Inject(String) apiHost: string,
    @Inject(String) endpoint: string,
    httpClient: HttpClient
  ) {
    super(apiHost, endpoint, httpClient);
  }

  protected countryGet(countryName: string): Observable<T> {
    const params = this.generateGetRequestParams({
      fields: 'name,flags,cca2',
    });
    const requestOption: HttpRequest<unknown> = new HttpRequest(
      'GET',
      `/${countryName}`,
      {
        params,
        withCredentials: false,
        responseType: 'json',
        reportProgress: false,
      }
    );
    return this.apiRequest<T>(requestOption).pipe(
      map((response: HttpResponse<T>) =>
        this.getSupportedCountries(response.body as T)
      ),
      catchError(() => {
        return of([] as T);
      })
    );
  }

  private getSupportedCountries(responsData: T): T {
    return (responsData as Array<any>).filter((item) =>
      Object.keys(CountryEnum).includes(item['cca2'])
    ) as T;
  }
}
