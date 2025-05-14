import {
  ChangeDetectionStrategy,
  Component,
  input,
  NgIterable,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DailyForecastListItemComponent } from '../daily-forecast-list-item/daily-forecast-list-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';
import { IFiveDaysForecastDTO } from '@lib-weather-app-store';

@Component({
  selector: 'lib-forecast-list',
  imports: [MatListModule, DailyForecastListItemComponent, ScrollingModule],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastListComponent {
  fiveDaysForecast = input<IFiveDaysForecastDTO[]>();
  // items: NgIterable<any> = Array.from({ length: 100 }).map(
  //   (_, i) => `Item #${i}`
  // );
}
