import { Component } from '@angular/core';

import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@Component({
  selector: 'lib-today-forecast-statistics-panel',
  imports: [WeatherChartComponent],
  templateUrl: './today-forecast-statistics-panel.component.html',
  styleUrl: './today-forecast-statistics-panel.component.scss',
})
export class TodayForecastStatisticsPanelComponent {}
