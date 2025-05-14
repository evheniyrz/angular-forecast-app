import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  linkedSignal,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  rxResource,
  takeUntilDestroyed,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  CitiesApiResponse,
  CountriesApiResponse,
  RestCitiesService,
  RestCountriesService,
  SubmitFomService,
} from '@lib-services';
import { concatMap, debounceTime, filter, of, tap } from 'rxjs';

import { IGeoForm, IGeoFormValue } from '@lib-components';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'lib-geo-position-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
    MatCheckboxModule,
    ScrollingModule,
    NgStyle,
  ],
  providers: [RestCitiesService, RestCountriesService],
  templateUrl: './geo-position-form.component.html',
  styleUrl: './geo-position-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoPositionFormComponent {
  readonly dialogRef = inject(MatDialogRef<GeoPositionFormComponent>);
  private countriesService = inject(RestCountriesService);
  private citiesService = inject(RestCitiesService);
  private submitService = inject(SubmitFomService);
  private destroyRef = inject(DestroyRef);
  private onlyLettersRegexp: RegExp = new RegExp(/^[a-zA-Z]/, 'gi');
  private selectedCountryName: WritableSignal<string> = signal('');

  geopositionForm: FormGroup<IGeoForm> = new FormGroup({
    country: new FormControl<CountriesApiResponse>({} as CountriesApiResponse, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    useAsDefaultGeo: new FormControl<boolean>(false, { nonNullable: true }),
  });

  private _cityInputFormControlValue: Signal<string> = toSignal(
    (this.geopositionForm.get('city') as FormControl).valueChanges
  );

  private _sourceCityList: ResourceRef<CitiesApiResponse | undefined> =
    rxResource({
      request: () => ({ country: this.selectedCountryName() }),
      loader: ({ request }) =>
        !!request.country.length
          ? this.citiesService.citiesByCountry(request.country)
          : of({ error: false, msg: '', data: [] }),
    });

  cityList: WritableSignal<string[]> = linkedSignal<string, string[]>({
    source: this._cityInputFormControlValue,
    computation: (partialCityName = '', _) => {
      const sourceValue = this._sourceCityList.value();
      const filteredCities = sourceValue
        ? (sourceValue as CitiesApiResponse).data.filter((cityName) =>
            cityName.toLowerCase().includes(partialCityName.toLowerCase())
          )
        : [];
      this.height =
        filteredCities.length * this.itemSize < 200
          ? `${filteredCities.length * this.itemSize}px`
          : '200px';
      console.log('%c LOG CITY LENGTH', 'color: green;background:white;', {
        h: this.height,
        l: filteredCities.length,
      });
      return filteredCities;
    },
  });

  countryList: WritableSignal<CountriesApiResponse[]> = signal([]);
  height: string = '200px';
  itemSize = 50;

  ngOnInit(): void {
    (this.geopositionForm.get('country') as FormControl).valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value) => {
          const trimValue = value.toString().trim();
          return this.onlyLettersRegexp.test(trimValue) && trimValue.length > 2;
        }),
        debounceTime(650),
        concatMap((value: string) => {
          return this.countriesService.getCountryByName(value);
        }),
        tap((response: CountriesApiResponse[]) => {
          this.countryList.set(response);
        })
      )
      .subscribe();
  }

  displayFn(country: CountriesApiResponse): string {
    return country && country.name ? country.name.official : '';
  }

  onCountrySelected(selectedEvent: MatAutocompleteSelectedEvent) {
    this.geopositionForm.get('city')?.reset();
    this.cityList.set([]);
    const country: CountriesApiResponse = selectedEvent.option
      .value as CountriesApiResponse;
    this.selectedCountryName.set(country.name.common);
  }

  onSubmit() {
    if (this.geopositionForm.valid) {
      const value: IGeoFormValue = this.geopositionForm.value as IGeoFormValue;
      this.submitService.submitFormData(value);
      this.dialogRef.close();
    }
  }

  cityNameTrack(index: number, item: string): number {
    return index;
  }
}
