import { DatePipe, DecimalPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { IFiveDaysForecastDTO } from '@lib-weather-app-store';

@Component({
  selector: 'lib-daily-forecast-list-item',
  imports: [MatDividerModule, NgStyle, DatePipe, DecimalPipe],
  templateUrl: './daily-forecast-list-item.component.html',
  styleUrl: './daily-forecast-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastListItemComponent {
  itemData = input<IFiveDaysForecastDTO>();
}
