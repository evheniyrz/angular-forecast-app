import { NgStyle, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  AdjectivePipe,
  CodeToCountryNamePipe,
  MathRoundPipe,
} from '@lib-pipes';
import { TodayForecastTemplateData } from '@lib-services';
import { TodayForecastSliderComponent } from '../today-forecast-slider/today-forecast-slider.component';

@Component({
  selector: 'lib-today-forecast-panel',
  imports: [
    NgStyle,
    MathRoundPipe,
    CodeToCountryNamePipe,
    AdjectivePipe,
    TodayForecastSliderComponent,
  ],
  templateUrl: './today-forecast-panel.component.html',
  styleUrl: './today-forecast-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayForecastPanelComponent {
  todayForecast = input.required<TodayForecastTemplateData>();
}
