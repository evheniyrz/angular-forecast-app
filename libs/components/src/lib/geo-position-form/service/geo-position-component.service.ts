import { HttpErrorResponse } from '@angular/common/http';
import {
  inject,
  Injectable,
  linkedSignal,
  ResourceRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGeoForm } from '@lib-components';
import {
  CountriesApiService,
  CitiesApiService,
  ICountriesApiResponse,
  ICitiesApiResponse,
} from '@lib-services';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

@Injectable()
export class GeoPositionComponentService {
  private countriesService = inject(CountriesApiService);
  private citiesService = inject(CitiesApiService);
  private onlyLettersRegExp: RegExp = /^[\p{L}]+(?:['\s][\p{L}]+)*(?:\s)?$/u;
  selectedCountryName: WritableSignal<string> = signal('');

  form: FormGroup<IGeoForm> = new FormGroup({
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(this.onlyLettersRegExp),
        Validators.minLength(3),
      ],
    }),
    city: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    useAsDefaultGeo: new FormControl<boolean>(false, { nonNullable: true }),
  });

  private _cityValueSource: Signal<string> = toSignal(
    this.form.controls.city.valueChanges,
    {
      initialValue: '',
    }
  );

  private _countryNameValue = toSignal(
    this.form.controls.country.valueChanges.pipe(
      debounceTime(500),
      filter((_) => this.form.controls.country.valid),
      distinctUntilChanged((prev, curr) => this.selectedCountryName() === curr)
    ),
    {
      initialValue: '',
    }
  );

  private _sourceCityList: ResourceRef<ICitiesApiResponse | undefined> =
    rxResource({
      request: () => ({ country: this.selectedCountryName() }),
      loader: ({ request }) =>
        !!request.country.length
          ? this.citiesService.citiesByCountry(request.country)
          : of({ error: false, msg: '', data: [] }),
    });

  cityList: WritableSignal<string[]> = linkedSignal<string, string[]>({
    source: this._cityValueSource,
    computation: (partialCityName = '', _) => {
      const sourceValue = this._sourceCityList.value();
      let filteredCities: string[] = [];
      if (!!sourceValue && !!sourceValue.data.length) {
        filteredCities = (sourceValue as ICitiesApiResponse).data.filter(
          (cityName) =>
            cityName.toLowerCase().includes(partialCityName.toLowerCase())
        );
      }

      return filteredCities;
    },
  });

  countryList = rxResource({
    request: () => ({ countryName: this._countryNameValue() }),
    loader: ({ request }) => {
      return !!request.countryName.normalize().length
        ? this.countriesService.getCountries(request.countryName).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 404) {
                this.form.controls.country.setErrors(
                  { notfound: true },
                  { emitEvent: true }
                );
              }
              return EMPTY;
            })
          )
        : EMPTY;
    },
    defaultValue: [],
  });
}
