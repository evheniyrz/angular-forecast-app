export interface ForecastNowDTO {
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  date: number;
  main: {
    temp: number;
  };
}
