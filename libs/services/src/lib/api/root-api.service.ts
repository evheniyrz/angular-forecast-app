import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export abstract class RootApiService {
  constructor(
    @Inject(String) private apiHost: string,
    @Inject(String) private endpoint: string,
    private httpClient: HttpClient
  ) {}

  protected apiRequest<T>(reqConfig: HttpRequest<any>): Observable<T> {
    reqConfig = reqConfig.clone({
      url: this.generateResourceURL(reqConfig.url),
    });

    return this.httpClient.request<T>(reqConfig).pipe(
      filter((event) => event.type === HttpEventType.Response),
      map((response) => response.body as T)
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

  private generateResourceURL(resourcePartialPath: string): string {
    const finalURL: string = `${this.apiHost}${this.endpoint}${resourcePartialPath}`;
    return finalURL;
  }
}
