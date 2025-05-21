import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  DailyForecastPanelComponent,
  FloatControlPanelComponent,
} from '@lib-components';
import { TodayForecastPanelComponent } from '@lib-components';
import { TodayForecastStatisticsPanelComponent } from '@lib-components';

import {
  WeatherAppState,
  WeatherAppStoreService,
} from '@lib-weather-app-store';

import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-dashboard',
  imports: [
    TodayForecastPanelComponent,
    TodayForecastStatisticsPanelComponent,
    DailyForecastPanelComponent,
    AsyncPipe,
    FloatControlPanelComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private store: WeatherAppStoreService = inject(WeatherAppStoreService);

  // °C = (°F − 32) x 5/9
  // °F = (°C × 9/5) + 32

  public $templateDataStream: Observable<WeatherAppState> = this.store.state$;
}
