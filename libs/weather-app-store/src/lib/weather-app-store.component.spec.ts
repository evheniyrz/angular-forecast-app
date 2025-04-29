import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAppStoreComponent } from './weather-app-store.component';

describe('WeatherAppStoreComponent', () => {
  let component: WeatherAppStoreComponent;
  let fixture: ComponentFixture<WeatherAppStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherAppStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherAppStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
