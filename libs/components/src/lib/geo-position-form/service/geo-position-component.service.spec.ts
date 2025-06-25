import { TestBed } from '@angular/core/testing';

import { GeoPositionComponentService } from './geo-position-component.service';

describe('GeoPositionComponentService', () => {
  let service: GeoPositionComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoPositionComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
