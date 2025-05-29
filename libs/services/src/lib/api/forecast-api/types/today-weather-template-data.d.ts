export interface TodayForecastTemplateData {
  weather: {
    description: string;
    icon: string;
    main: string;
    weather_id: number;
  };
  temp_min: number;
  sys: {
    country: string;
    name: string;
  };
}
