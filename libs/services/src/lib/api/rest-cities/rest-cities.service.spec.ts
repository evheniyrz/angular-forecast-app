import { TestBed } from '@angular/core/testing';

import { RestCitiesService } from './rest-cities.service';

describe('RestCitiesService', () => {
  let service: RestCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
