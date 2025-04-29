import { TestBed } from '@angular/core/testing';

import { WeatherAppStoreService } from './weather-app-store.service';

describe('WeatherAppStoreService', () => {
  let service: WeatherAppStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherAppStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
