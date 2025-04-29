import { Inject, Injectable } from '@angular/core';
import { ForecastApiService } from 'libs/services/src/lib/api/forecast-api/forecast-api.service';
import { OPEN_WEATHER_API_HOST } from '@lib-services';
import { HttpClient } from '@angular/common/http';
import { CombineTemplateData, TodayWeatherResponse } from './types';
import { map, Observable } from 'rxjs';

@Injectable()
export class OpenWeatherService extends ForecastApiService<TodayWeatherResponse> {
  constructor(
    @Inject(OPEN_WEATHER_API_HOST) dataHost: string,
    httpClientEnt: HttpClient
  ) {
    super(dataHost, '/weather', httpClientEnt);
  }

  getCurrentForecast(
    cityName = 'Mykolayiv',
    countryCode = 'ua'
  ): Observable<CombineTemplateData> {
    return this.weatherGet().pipe(
      map((apiResp: TodayWeatherResponse) => {
        var templateData: CombineTemplateData =
          this.generateTemplateData(apiResp);
        return templateData;
      })
    );
  }

  private generateTemplateData(
    apiResponse: TodayWeatherResponse
  ): CombineTemplateData {
    return {
      todayOverviewDTO: {
        weather: {
          description: apiResponse.weather[0].description,
          main: apiResponse.weather[0].main,
          icon: this.generateLargeIconUrl(apiResponse.weather[0].icon),
        },
        temp_min: apiResponse.main.temp_min,
        sys: {
          name: apiResponse.name,
          country: apiResponse.sys.country,
        },
      },
      nowForecastDTO: {
        wind: {
          speed: apiResponse.wind.speed,
          deg: apiResponse.wind.deg,
          gust: apiResponse.wind.gust,
        },
        date: apiResponse.dt * 1000,
        main: {
          temp: apiResponse.main.temp,
        },
      },
    };
  }

  private generateLargeIconUrl(iconCode: string): string {
    return `https://rodrigokamada.github.io/openweathermap/images/${iconCode}_t@4x.png`;
  }
}
