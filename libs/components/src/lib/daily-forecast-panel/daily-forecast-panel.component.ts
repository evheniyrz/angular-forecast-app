import { Component, input } from '@angular/core';
import { DailySwitcherFormComponent } from 'libs/components/src/lib/daily-forecast-panel/components/daily-switcher-form/daily-switcher-form.component';
import { ForecastNowComponent } from './components/forecast-now/forecast-now.component';
import { MatDividerModule } from '@angular/material/divider';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { IDailyForecastDTO } from '@lib-weather-app-store';

@Component({
  selector: 'lib-daily-forecast-panel',
  imports: [
    DailySwitcherFormComponent,
    ForecastNowComponent,
    MatDividerModule,
    ForecastListComponent,
  ],
  templateUrl: './daily-forecast-panel.component.html',
  styleUrl: './daily-forecast-panel.component.scss',
})
export class DailyForecastPanelComponent {
  currentForecastCollection = input<IDailyForecastDTO>();
}
