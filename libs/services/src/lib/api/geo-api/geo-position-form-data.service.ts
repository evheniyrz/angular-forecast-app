import { Injectable } from '@angular/core';
import { IGeoFormValue } from '@lib-components';
import { ResolvedGeoData, STORAGEKEYS, SubmitFomService } from '@lib-services';
import { WeatherAppStoreService } from '@lib-weather-app-store';
import { LocalStorageService } from 'libs/services/src/lib/api/local-storage/local-storage.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoPositionFormDataService
  implements SubmitFomService<IGeoFormValue>
{
  constructor(
    private storeService: WeatherAppStoreService,
    private storageService: LocalStorageService<ResolvedGeoData>
  ) {}
  submitFormData(params: IGeoFormValue): Subscription {
    const geodata: ResolvedGeoData = {
      city: params.city,
      country: params.country.name.common,
      country_code: params.country.cca2,
      region: '',
      city_geoname_id: 0,
    };

    if (params.useAsDefaultGeo) {
      this.storageService.setItem(STORAGEKEYS.USER_GEO, geodata);
    }

    return this.storeService.setAppWeatherState(geodata);
  }
}
