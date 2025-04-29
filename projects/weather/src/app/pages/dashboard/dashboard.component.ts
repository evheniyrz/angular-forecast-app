import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DailyForecastPanelComponent } from '@lib-components';
import { TodayForecastPanelComponent } from '@lib-components';
import { TodayForecastStatisticsPanelComponent } from '@lib-components';
import {
  CombineTemplateData,
  OpenWeatherService,
  TodayWeatherResponse,
} from '@lib-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-dashboard',
  imports: [
    AsyncPipe,
    TodayForecastPanelComponent,
    TodayForecastStatisticsPanelComponent,
    DailyForecastPanelComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [OpenWeatherService],
})
export class DashboardComponent {
  // °C = (°F − 32) x 5/9
  // °F = (°C × 9/5) + 32
  $weatherService: OpenWeatherService = inject(OpenWeatherService);
  public $templateDataStream: Observable<CombineTemplateData> =
    this.$weatherService.getCurrentForecast();
}
