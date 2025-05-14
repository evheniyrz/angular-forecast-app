import { TestBed } from '@angular/core/testing';

import { TwntFourForecastService } from './twnt-four-forecast.service';

describe('TwntFourForecastService', () => {
  let service: TwntFourForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwntFourForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
