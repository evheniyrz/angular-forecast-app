import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayForecastSliderComponent } from './today-forecast-slider.component';

describe('TodayForecastSliderComponent', () => {
  let component: TodayForecastSliderComponent;
  let fixture: ComponentFixture<TodayForecastSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayForecastSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayForecastSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
