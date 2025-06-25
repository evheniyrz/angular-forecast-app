import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ResourceRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  ICountriesApiResponse,
  CitiesApiService,
  CountriesApiService,
  SubmitFomService,
} from '@lib-services';

import { IGeoForm, IGeoFormValue } from '@lib-components';
import { MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgStyle } from '@angular/common';
import { GeoPositionComponentService } from './service/geo-position-component.service';
import { FormErrorStateMatcher } from './service/matcher/form-error-state.matcher';

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
  providers: [
    CitiesApiService,
    CountriesApiService,
    GeoPositionComponentService,
  ],
  templateUrl: './geo-position-form.component.html',
  styleUrl: './geo-position-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoPositionFormComponent {
  readonly dialogRef = inject(MatDialogRef<GeoPositionFormComponent>);
  private submitService = inject(SubmitFomService);
  private formComponentService = inject(GeoPositionComponentService);

  matcher = new FormErrorStateMatcher();

  geopositionForm: FormGroup<IGeoForm> = this.formComponentService.form;

  cityList: WritableSignal<string[]> = this.formComponentService.cityList;

  countryList: ResourceRef<ICountriesApiResponse[]> =
    this.formComponentService.countryList;

  itemSize = 50;

  cdkScrollHeight: Signal<string> = computed(() => {
    return this.cityList().length * this.itemSize < 200
      ? `${this.cityList().length * this.itemSize}px`
      : '200px';
  });

  private displayFn(commonCountryName: string): string {
    const filteredCityList: ICountriesApiResponse[] | undefined =
      this.countryList?.value();

    const selectedCountryItem: ICountriesApiResponse | undefined =
      filteredCityList && !!filteredCityList.length
        ? filteredCityList.find(
            (item: ICountriesApiResponse) =>
              item.name.common === commonCountryName
          )
        : undefined;
    return selectedCountryItem ? selectedCountryItem.name.official : '';
  }

  displayFnWithBind = this.displayFn.bind(this);

  onCountrySelected(selectedEvent: MatAutocompleteSelectedEvent) {
    this.geopositionForm.get('city')?.reset();
    this.cityList.set([]);

    this.formComponentService.selectedCountryName.set(
      selectedEvent.option.value
    );
  }

  onSubmit() {
    if (this.geopositionForm.valid && this.countryList.hasValue()) {
      const value: IGeoFormValue = {
        ...this.geopositionForm.value,
        country: this.countryList
          .value()
          ?.find(
            (item: ICountriesApiResponse) =>
              item.name.common ===
              this.formComponentService.selectedCountryName()
          ) as ICountriesApiResponse,
      } as IGeoFormValue;
      this.submitService.submitFormData(value).add(this.dialogRef.close());
    }
  }

  cityNameTrack(index: number, item: string): number {
    return index;
  }
}
//
//  headers: {
//   'x-rapidapi-key': '33aff74ea9mshe16e00a86b12032p1b7ff5jsn66a8da2c7f52',
//   'x-rapidapi-host': 'countries-states-and-cities.p.rapidapi.com',
// },
