import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'lib-daily-switcher-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './daily-switcher-form.component.html',
  styleUrl: './daily-switcher-form.component.scss',
})
export class DailySwitcherFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  dailySwitcherForm: FormGroup = this.fb.group({
    daySwitcher: ['4'],
  });

  ngOnInit(): void {
    this.dailySwitcherForm.valueChanges
      .pipe(
        startWith({
          daySwitcher: '4',
        }),
        tap((val) => console.log({ val }))
      )
      .subscribe();
  }

  updateOnChange(index: number, form: HTMLFormElement): void {
    form.style.setProperty('--radio-btn-index', index.toString());
  }
}
