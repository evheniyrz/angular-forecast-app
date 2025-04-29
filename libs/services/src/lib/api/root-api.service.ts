import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class RootApiService {
  constructor(
    @Inject(String) private apiHost: string,
    @Inject(String) private endpoint: string,
    private httpClient: HttpClient
  ) {}

  protected apiRequest<T>(
    reqConfig: HttpRequest<any>
  ): Observable<HttpResponse<T>> {
    reqConfig = reqConfig.clone({
      url: this.generateResourceURL(),
    });
    return this.httpClient.request<T>(reqConfig).pipe(
      filter((event) => event.type === HttpEventType.Response),
      tap((resp: HttpResponse<T>) => {
        console.log('ROOT API=>', { resp });
      })
    );
  }

  protected generateGetRequestParams(paramsSet: {
    [param: string]: string;
  }): HttpParams {
    const params = new HttpParams({
      fromObject: paramsSet,
    });
    return params;
  }

  private generateResourceURL(): string {
    const finalURL: string = `${this.apiHost}${this.endpoint}`;
    return finalURL;
  }
}
