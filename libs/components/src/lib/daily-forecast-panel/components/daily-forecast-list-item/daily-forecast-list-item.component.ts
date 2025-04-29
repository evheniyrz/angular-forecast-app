import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'lib-daily-forecast-list-item',
  imports: [MatDividerModule, NgStyle],
  templateUrl: './daily-forecast-list-item.component.html',
  styleUrl: './daily-forecast-list-item.component.scss',
})
export class DailyForecastListItemComponent {}
