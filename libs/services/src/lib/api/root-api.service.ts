import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

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
      url: this.generateResourceURL(reqConfig.url),
    });
    return this.httpClient
      .request<T>(reqConfig)
      .pipe(filter((event) => event.type === HttpEventType.Response));
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
