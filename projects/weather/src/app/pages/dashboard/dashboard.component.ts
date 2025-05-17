import {
  ChangeDetectionStrategy,
  Component,
  inject,
  isDevMode,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
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

import { filter, Observable, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { DashboardPlaceholderComponent } from './dashboard-placeholder/dashboard-placeholder.component';

@Component({
  selector: 'lib-dashboard',
  imports: [
    TodayForecastPanelComponent,
    TodayForecastStatisticsPanelComponent,
    DailyForecastPanelComponent,
    AsyncPipe,
    FloatControlPanelComponent,
    DashboardPlaceholderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private store: WeatherAppStoreService = inject(WeatherAppStoreService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  // °C = (°F − 32) x 5/9
  // °F = (°C × 9/5) + 32

  public $templateDataStream: Observable<WeatherAppState> = this.store.state$;
  // .pipe(filter((data: WeatherAppState) => data.initialized));

  ngOnInit(): void {
    (this.activatedRoute.data as Observable<Data>)
      .pipe(
        tap((data: Data) => {
          this.store.setAppWeatherState(data['geo']);
        })
      )
      .subscribe();
  }
}
