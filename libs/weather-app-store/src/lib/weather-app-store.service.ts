import { Injectable } from '@angular/core';
import {
  CurrentDayWeatherService,
  ResolvedGeoData,
  TodayForecastTemplateData,
  TodayWeatherResponse,
  TwntFourForecastService,
  FiveDaysCollectionResponse,
  WeatherStateCollection,
} from '@lib-services';
import {
  IFiveDaysForecastDTO,
  IForecastNowDTO,
  WeatherAppState,
} from '@lib-weather-app-store';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';

export const INITIAL_STATE: WeatherAppState = {
  geo: {} as ResolvedGeoData,
  weatherList: [],
  todayForecast: {} as TodayForecastTemplateData,
  dailyForecast: {
    nowForecast: {} as IForecastNowDTO,
    fiveDaysForecast: [],
  },
  statisticsState: [],
  initialized: false,
};

@Injectable({
  providedIn: 'root',
})
export class WeatherAppStoreService extends ComponentStore<WeatherAppState> {
  constructor(
    private readonly weatherService: TwntFourForecastService,
    private readonly currentDayForecast: CurrentDayWeatherService
  ) {
    super(INITIAL_STATE);
  }

  readonly setAppWeatherState = this.effect(
    (geoParam$: Observable<ResolvedGeoData>) => {
      return geoParam$.pipe(
        switchMap((geoParam: ResolvedGeoData) => {
          return combineLatest([
            this.weatherService.fifeDaysForecastData(geoParam),
            this.currentDayForecast.getCurrentForecast(geoParam),
          ]).pipe(
            tap({
              next: ([twntFourResponse, todayForecast]: [
                FiveDaysCollectionResponse,
                TodayWeatherResponse
              ]) => {
                if (Number(twntFourResponse.cod) < 400) {
                  this.appStateInitializer([
                    geoParam,
                    twntFourResponse,
                    todayForecast,
                  ]);
                }
              },
            })
          );
        })
      );
    }
  );

  readonly appStateInitializer = this.updater(
    (
      state: WeatherAppState,
      fullState: [
        ResolvedGeoData,
        FiveDaysCollectionResponse,
        TodayWeatherResponse
      ]
    ) => ({
      ...state,
      geo: fullState[0],
      weatherList: fullState[1].list,
      todayForecast: this.todayForecastData(fullState[2]),
      dailyForecast: {
        nowForecast: this.nowForecastTemplateData(fullState[2]),
        fiveDaysForecast: this.selectRepresentative(
          this.groupByDate(fullState[1])
        ),
      },
      statisticsState: fullState[1].list.slice(0, 9),
      initialized: true,
    })
  );

  readonly updateWeatherState = this.updater(
    (state: WeatherAppState, weatherList: WeatherStateCollection[]) => ({
      ...state,
      weatherList,
    })
  );
  readonly updateGeoState = this.updater(
    (state: WeatherAppState, geo: ResolvedGeoData) => ({
      ...state,
      geo,
    })
  );
  readonly updateTodayWeatherState = this.updater(
    (state: WeatherAppState, todayForecast: TodayWeatherResponse) => ({
      ...state,
      todayForecast: this.todayForecastData(todayForecast),
    })
  );
  // readonly updateNowForecastState = this.updater(
  //   (state: WeatherAppState, nowForecast: ForecastNowDTO) => ({
  //     ...state,
  //     dailyForecast: nowForecast,
  //   })
  // );
  readonly updateForecastStatisticsState = this.updater(
    (state: WeatherAppState, statisticsState: WeatherStateCollection[]) => ({
      ...state,
      statisticsState,
    })
  );

  sliceJSWeatherState(startIndex: number, endIndex: number) {
    return this.select((state) =>
      state.weatherList?.slice(startIndex, endIndex)
    );
  }

  private todayForecastData(
    apiResponse: TodayWeatherResponse
  ): TodayForecastTemplateData {
    return {
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
    };
  }

  private nowForecastTemplateData(
    apiResponse: TodayWeatherResponse
  ): IForecastNowDTO {
    return {
      wind: {
        speed: apiResponse.wind.speed,
        deg: apiResponse.wind.deg,
        gust: apiResponse.wind.gust,
      },
      date: apiResponse.dt * 1000,
      main: {
        temp: apiResponse.main.temp,
      },
    };
  }

  // const weatherData = [/* Ваши 40 элементов из API */];

  // Функция группировки по датам
  private groupByDate(data: FiveDaysCollectionResponse) {
    return data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0]; // Извлекаем дату
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  }

  // Функция выбора представительного элемента (ближайшего к 12:00)
  private selectRepresentative(
    groupedData: Record<string, WeatherStateCollection[]>
  ): IFiveDaysForecastDTO[] {
    return Object.entries(groupedData).map(([date, items]) => {
      const initialWeatherItem = items.reduce((closest, item) => {
        const hour = parseInt(item.dt_txt.split(' ')[1].split(':')[0]);
        return Math.abs(hour - 12) <
          Math.abs(parseInt(closest.dt_txt.split(' ')[1].split(':')[0]) - 12)
          ? item
          : closest;
      });

      return {
        icon: this.generateLargeIconUrl(initialWeatherItem.weather[0].icon),
        date: initialWeatherItem.dt * 1000,
        weatherState: initialWeatherItem.weather[0].description,
        temp: initialWeatherItem.main.temp,
      };
    });
  }

  // Применяем функции
  // const groupedData = groupByDate(weatherData);
  // const selectedWeather = selectRepresentative(groupedData);
  // {
  //   "dt": 1746111600,
  //   "main": {
  //       "temp": 19.26,
  //       "feels_like": 18.47,
  //       "temp_min": 19.26,
  //       "temp_max": 19.26,
  //       "pressure": 1014,
  //       "sea_level": 1014,
  //       "grnd_level": 1010,
  //       "humidity": 47,
  //       "temp_kf": 0
  //   },
  //   "weather": [
  //       {
  //           "id": 804,
  //           "main": "Clouds",
  //           "description": "overcast clouds",
  //           "icon": "04d"
  //       }
  //   ],
  //   "clouds": {
  //       "all": 89
  //   },
  //   "wind": {
  //       "speed": 4.63,
  //       "deg": 208,
  //       "gust": 4.43
  //   },
  //   "visibility": 10000,
  //   "pop": 0,
  //   "sys": {
  //       "pod": "d"
  //   },
  //   "dt_txt": "2025-05-01 15:00:00"
  // }

  private generateLargeIconUrl(iconCode: string): string {
    return `https://rodrigokamada.github.io/openweathermap/images/${iconCode}_t@4x.png`;
  }
}
