import { FormControl } from '@angular/forms';
import { CountriesApiResponse } from '@lib-services';

export interface IGeoForm {
  country: FormControl<CountriesApiResponse>;
  city: FormControl<string>;
  useAsDefaultGeo: FormControl<boolean>;
}
