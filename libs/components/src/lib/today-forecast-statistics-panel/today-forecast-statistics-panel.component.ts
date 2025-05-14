import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { WeatherStateCollection } from '@lib-services';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'lib-today-forecast-statistics-panel',
  imports: [WeatherChartComponent],
  providers: [DatePipe, TitleCasePipe],
  templateUrl: './today-forecast-statistics-panel.component.html',
  styleUrl: './today-forecast-statistics-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayForecastStatisticsPanelComponent {
  private date: DatePipe = inject(DatePipe); //shortTime
  private titleCasePipe: TitleCasePipe = inject(TitleCasePipe);
  statisticsData = input<
    Array<Record<string, string | number>>,
    WeatherStateCollection[]
  >([], {
    transform: (inputData: WeatherStateCollection[]) => {
      console.log('Statistics input transform');
      return this.transformDataToChartData(inputData);
    },
  });

  private transformDataToChartData(
    data: WeatherStateCollection[]
  ): Array<Record<string, string | number>> {
    let chartData: Array<Record<string, string | number>> = [];
    chartData = data.reduce<Array<Record<string, string | number>>>(
      (collection, next) => {
        collection.push({
          time: this.date.transform(next.dt_txt, 'shortTime') as string,
          temperature: Math.round(next.main.temp),
          weatherState: this.titleCasePipe.transform(
            next.weather[0].description
          ),
        });
        return collection;
      },
      []
    );

    return chartData;
  }
}
