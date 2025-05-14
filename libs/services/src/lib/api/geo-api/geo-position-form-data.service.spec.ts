import { TestBed } from '@angular/core/testing';

import { GeoPositionFormDataService } from './geo-position-form-data.service';

describe('GeoPositionFormDataService', () => {
  let service: GeoPositionFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoPositionFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
