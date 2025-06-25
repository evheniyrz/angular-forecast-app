import { ICountriesApiResponse } from '@lib-services';

export interface IGeoFormValue {
  country: ICountriesApiResponse;
  city: string;
  useAsDefaultGeo: boolean;
}
