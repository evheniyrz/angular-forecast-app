import { IFiveDaysForecastDTO, IForecastNowDTO } from '@lib-weather-app-store';

export interface IDailyForecastDTO {
  nowForecast: IForecastNowDTO;
  fiveDaysForecast: IFiveDaysForecastDTO[];
}
