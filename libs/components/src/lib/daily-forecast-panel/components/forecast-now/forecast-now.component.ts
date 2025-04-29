import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DegToWindDirectionPipe, MathRoundPipe } from '@lib-pipes';
import { ForecastNowDTO } from '@lib-services';

@Component({
  selector: 'lib-forecast-now',
  imports: [DegToWindDirectionPipe, MathRoundPipe, DatePipe],
  templateUrl: './forecast-now.component.html',
  styleUrl: './forecast-now.component.scss',
})
export class ForecastNowComponent {
  forecastNow = input<ForecastNowDTO>();
}
