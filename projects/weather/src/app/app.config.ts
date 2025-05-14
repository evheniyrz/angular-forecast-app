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
  GeoPositionFormDataService,
  httpErrorInterceptor,
  OPEN_WEATHER_API_HOST,
  OPEN_WEATHER_API_TOKEN,
  REST_CITIES_API_HOST,
  REST_COUNTRIES_API_HOST,
  SubmitFomService,
  withcredentialsInterceptor,
} from '@lib-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, withcredentialsInterceptor])
    ),
    provideEnvironmentInitializer(() => {}),
    {
      provide: SubmitFomService,
      useExisting: GeoPositionFormDataService,
    },
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
      useValue: 'https://iplocate.io/api/lookup',
    },
    {
      provide: GEO_LOCATION_API_TOKEN,
      useValue: 'b441794f8e447b5ea124387614a42910',
    },
    {
      provide: REST_COUNTRIES_API_HOST,
      useValue: 'https://restcountries.com/v3.1/name',
    },
    {
      provide: REST_CITIES_API_HOST,
      useValue: 'https://countriesnow.space/api/v0.1/countries/cities',
    },
  ],
};
// 'https://api.openweathermap.org/data/2.5'

// countries by name: https://restcountries.com/v3.1/name/{name}
// by fields: https://restcountries.com/v3.1/name/aus?fields=name,flags
// POST Get single country and its states
// POST https://countriesnow.space/api/v0.1/countries/states {body: { country: countryName}}
// POST Get cities in a state
// https://countriesnow.space/api/v0.1/countries/state/cities {
//     "country": "Nigeria",
//     "state": "Lagos"
// }
// POST Get cities of a specified country
// https://countriesnow.space/api/v0.1/countries/cities
// {
//   "country": "nigeria"
// }
