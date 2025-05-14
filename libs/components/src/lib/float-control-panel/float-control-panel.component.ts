import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GeoPositionButtonComponent } from 'libs/components/src/lib/geo-position-button/geo-position-button.component';

@Component({
  selector: 'lib-float-control-panel',
  imports: [MatButtonModule, GeoPositionButtonComponent],
  templateUrl: './float-control-panel.component.html',
  styleUrl: './float-control-panel.component.scss',
})
export class FloatControlPanelComponent {}
