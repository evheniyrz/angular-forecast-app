import {
  ApplicationConfig,
  provideEnvironmentInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  GEO_LOCATION_API_TOKEN,
  GEO_LOCATION_HOST,
  OPEN_WEATHER_API_HOST,
  OPEN_WEATHER_API_TOKEN,
  withcredentialsInterceptor,
} from '@lib-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([withcredentialsInterceptor])),
    provideEnvironmentInitializer(() => {}),
    {
      provide: OPEN_WEATHER_API_HOST,
      useValue: 'https://api.openweathermap.org/data/2.5',
    },
    {
      provide: OPEN_WEATHER_API_TOKEN,
      useValue: 'f2f367b6802fb926387ec43c28c57846',
    },
    {
      provide: GEO_LOCATION_HOST,
      useValue: 'https://ipgeolocation.abstractapi.com/v1',
    },
    {
      provide: GEO_LOCATION_API_TOKEN,
      useValue: '990d95afbdd24cc2a35fd650671b6be9',
    },
  ],
};
// 'https://api.openweathermap.org/data/2.5'
