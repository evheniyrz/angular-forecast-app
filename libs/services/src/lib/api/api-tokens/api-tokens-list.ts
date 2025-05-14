import { InjectionToken } from '@angular/core';

export const OPEN_WEATHER_API_HOST: InjectionToken<string> = new InjectionToken(
  'Open Weather API Host'
);
export const OPEN_WEATHER_API_TOKEN: InjectionToken<string> =
  new InjectionToken('Open Weather API Token');

export const GEO_LOCATION_HOST: InjectionToken<string> = new InjectionToken(
  'Open Weather API Host'
);
export const GEO_LOCATION_API_TOKEN: InjectionToken<string> =
  new InjectionToken('Open Weather API Token');
export const REST_COUNTRIES_API_HOST: InjectionToken<string> =
  new InjectionToken('Rest Countries API Host');
export const REST_CITIES_API_HOST: InjectionToken<string> = new InjectionToken(
  'Get cities of a specified country'
);
