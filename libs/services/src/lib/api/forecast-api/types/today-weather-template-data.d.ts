export interface TodayOverviewTemplateData {
  weather: { description: string; icon: string; main: string };
  temp_min: number;
  sys: {
    country: string;
    name: string;
  };
}
