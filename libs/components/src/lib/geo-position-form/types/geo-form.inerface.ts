import { FormControl } from '@angular/forms';

export interface IGeoForm {
  country: FormControl<string>;
  city: FormControl<string>;
  useAsDefaultGeo: FormControl<boolean>;
}
