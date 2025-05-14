import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPositionFormComponent } from './geo-position-form.component';

describe('GeoPositionFormComponent', () => {
  let component: GeoPositionFormComponent;
  let fixture: ComponentFixture<GeoPositionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoPositionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
