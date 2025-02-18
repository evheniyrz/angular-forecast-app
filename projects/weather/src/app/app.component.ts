import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsComponent } from '@shared/components/';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComponentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weather';
}
