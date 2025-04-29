import { NgStyle, NumberSymbol } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  AdjectivePipe,
  CodeToCountryNamePipe,
  MathRoundPipe,
} from '@lib-pipes';
import { TodayOverviewTemplateData } from '@lib-services';

@Component({
  selector: 'lib-today-forecast-panel',
  imports: [NgStyle, MathRoundPipe, CodeToCountryNamePipe, AdjectivePipe],
  templateUrl: './today-forecast-panel.component.html',
  styleUrl: './today-forecast-panel.component.scss',
})
export class TodayForecastPanelComponent {
  todayForecast = input<TodayOverviewTemplateData>();
}
