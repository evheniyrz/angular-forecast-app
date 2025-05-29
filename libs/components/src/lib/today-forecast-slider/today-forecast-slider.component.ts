import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  InputSignal,
  linkedSignal,
  WritableSignal,
} from '@angular/core';
import { selectSlidersSet } from './weather-state-list/weather-state-list';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './swiper/swiper.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'lib-today-forecast-slider',
  imports: [SwiperDirective, NgStyle],
  templateUrl: './today-forecast-slider.component.html',
  styleUrl: './today-forecast-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayForecastSliderComponent {
  weatherID: InputSignal<number> = input.required<number>();
  sliderURLsSet: WritableSignal<ReadonlyArray<string>> = linkedSignal<
    number,
    ReadonlyArray<string>
  >({
    source: this.weatherID,
    computation: (weatherId, _) => selectSlidersSet(weatherId),
  });
  constructor() {
    register();
  }
}
