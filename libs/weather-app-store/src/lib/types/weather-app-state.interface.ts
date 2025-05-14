import {
  ResolvedGeoData,
  TodayForecastTemplateData,
  WeatherStateCollection,
} from '@lib-services';
import { IDailyForecastDTO } from '@lib-weather-app-store';

export interface WeatherAppState {
  geo: ResolvedGeoData;
  weatherList: WeatherStateCollection[];
  fiveDaysForecast: any;
  statisticsState: WeatherStateCollection[];
  dailyForecast: IDailyForecastDTO;
  todayForecast: TodayForecastTemplateData;
  initialized: boolean;
}
