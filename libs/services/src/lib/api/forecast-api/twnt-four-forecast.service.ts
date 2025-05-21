import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  OPEN_WEATHER_API_HOST,
  ResolvedGeoData,
  FiveDaysCollectionResponse,
} from '@lib-services';
import { ForecastApiService } from 'libs/services/src/lib/api/forecast-api/forecast-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwntFourForecastService extends ForecastApiService<FiveDaysCollectionResponse> {
  constructor(
    @Inject(OPEN_WEATHER_API_HOST) twtFourForecastHost: string,
    httpClientEnt: HttpClient
  ) {
    super(twtFourForecastHost, '/forecast', httpClientEnt);
  }

  fifeDaysForecastData(
    geo: ResolvedGeoData
  ): Observable<FiveDaysCollectionResponse> {
    return this.weatherGet(geo.city, geo.country_code);
  }
}
// Current weather API
// 3-hour forecast for 5 days API
// Weather Maps - Current weather, 5 weather layers
// Air Pollution API
// Geocoding API
