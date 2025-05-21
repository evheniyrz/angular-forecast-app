export interface FiveDaysCollectionResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherStateCollection[];
  city: CityConfiguration;
}

export interface WeatherStateCollection {
  dt: number;
  main: AtmosphericData;
  weather: WeatherState[];
  clouds: {
    all: number;
  };
  wind: WindState;
  visibility: number;
  pop: number;
  sys: {
    pod: number;
  };
  dt_txt: string;
}

interface AtmosphericData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherState {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WindState {
  speed: number;
  deg: number;
  gust: number;
}
interface CityConfiguration {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}
