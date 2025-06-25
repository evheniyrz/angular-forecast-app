import { TestBed } from '@angular/core/testing';
import { CitiesApiService } from '@lib-services';

describe('CitiesApiService', () => {
  let service: CitiesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
