import { CountriesApiResponse } from '@lib-services';

export interface IGeoFormValue {
  country: CountriesApiResponse;
  city: string;
  useAsDefaultGeo: boolean;
}
