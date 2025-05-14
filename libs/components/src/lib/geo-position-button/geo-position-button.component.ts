import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeoPositionFormComponent } from 'libs/components/src/lib/geo-position-form/geo-position-form.component';

@Component({
  selector: 'lib-geo-position-button',
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './geo-position-button.component.html',
  styleUrl: './geo-position-button.component.scss',
})
export class GeoPositionButtonComponent {
  readonly dialog = inject(MatDialog);

  openGeoFormDialog(): void {
    this.dialog.open(GeoPositionFormComponent, {
      width: '100%',
      maxWidth: '550px',
      minWidth: '280px',
      panelClass: 'dialog-overlay-pane',
    });
  }
}
