import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  GEO_LOCATION_API_TOKEN,
  GEO_LOCATION_HOST,
  OPEN_WEATHER_API_HOST,
  OPEN_WEATHER_API_TOKEN,
} from '@lib-services';
import { Observable } from 'rxjs';

export function withcredentialsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const apiHosts = {
    [inject(OPEN_WEATHER_API_HOST)]: {
      token: inject(OPEN_WEATHER_API_TOKEN),
      param: 'appid',
    },
    [inject(GEO_LOCATION_HOST)]: {
      token: inject(GEO_LOCATION_API_TOKEN),
      param: 'api_key',
    },
  };

  for (const [host, { token, param }] of Object.entries(apiHosts)) {
    if (req.url.includes(host) && req.withCredentials) {
      console.log('INTERCEPT SET TOKEN', { token });
      req = req.clone({
        setParams: {
          [param]: token,
        },
      });
      break; // прерываем цикл, так как обновлять запрос нужно только один раз
    }
  }

  return next(req);
}
