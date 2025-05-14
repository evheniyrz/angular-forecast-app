import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPositionButtonComponent } from './geo-position-button.component';

describe('GeoPositionButtonComponent', () => {
  let component: GeoPositionButtonComponent;
  let fixture: ComponentFixture<GeoPositionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoPositionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoPositionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
