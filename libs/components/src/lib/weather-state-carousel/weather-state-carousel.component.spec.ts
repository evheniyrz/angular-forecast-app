import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStateCarouselComponent } from './weather-state-carousel.component';

describe('WeatherStateCarouselComponent', () => {
  let component: WeatherStateCarouselComponent;
  let fixture: ComponentFixture<WeatherStateCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherStateCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherStateCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
