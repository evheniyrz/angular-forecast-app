import { Component, NgIterable } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DailyForecastListItemComponent } from '../daily-forecast-list-item/daily-forecast-list-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'lib-forecast-list',
  imports: [MatListModule, DailyForecastListItemComponent, ScrollingModule],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.scss',
})
export class ForecastListComponent {
  items: NgIterable<any> = Array.from({ length: 100 }).map(
    (_, i) => `Item #${i}`
  );
}
