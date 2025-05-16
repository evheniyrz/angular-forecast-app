import {
  ApplicationConfig,
  isDevMode,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  GEO_LOCATION_HOST,
  GeoPositionFormDataService,
  httpErrorInterceptor,
  OPEN_WEATHER_API_HOST,
  REST_CITIES_API_HOST,
  REST_COUNTRIES_API_HOST,
  SubmitFomService,
} from '@lib-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideEnvironmentInitializer(() => {}),
    {
      provide: SubmitFomService,
      useExisting: GeoPositionFormDataService,
    },
    {
      provide: OPEN_WEATHER_API_HOST,
      useValue: isDevMode()
        ? 'http://localhost:3000'
        : 'https://express-core-serv.onrender.com',
    },
    {
      provide: GEO_LOCATION_HOST,
      useValue: isDevMode()
        ? 'http://localhost:3000'
        : 'https://express-core-serv.onrender.com',
    },
    {
      provide: REST_COUNTRIES_API_HOST,
      useValue: isDevMode()
        ? 'http://localhost:3000'
        : 'https://express-core-serv.onrender.com',
    },
    {
      provide: REST_CITIES_API_HOST,
      useValue: isDevMode()
        ? 'http://localhost:3000'
        : 'https://express-core-serv.onrender.com',
    },
  ],
};
