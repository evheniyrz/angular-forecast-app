export interface TodayWeatherResponse {
  coord: Coord;
  weather: WeatherState[];
  base: string;
  main: MainIndicators;
  visibility: number;
  wind: WindState;
  clouds: {
    all: number;
  };
  dt: number;
  sys: SysIndicators;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface WeatherState {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface MainIndicators {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
interface WindState {
  speed: number;
  deg: number;
  gust: number;
}
interface SysIndicators {
  country: string;
  sunrise: number;
  sunset: number;
}
