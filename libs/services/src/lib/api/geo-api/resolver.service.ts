import { Injectable } from '@angular/core';
import {
  CurrentDayWeatherService,
  GeoByIpService,
  ResolvedGeoData,
  STORAGEKEYS,
  TwntFourForecastService,
} from '@lib-services';
import { WeatherAppStoreService } from '@lib-weather-app-store';

import { LocalStorageService } from 'libs/services/src/lib/api/local-storage/local-storage.service';
import {
  combineLatest,
  concatMap,
  defer,
  exhaustMap,
  iif,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  constructor(
    private localStotageService: LocalStorageService<ResolvedGeoData>,
    private geoByIpService: GeoByIpService,
    private weatherStoreService: WeatherAppStoreService,
    private readonly weatherService: TwntFourForecastService,
    private readonly currentDayForecast: CurrentDayWeatherService
  ) {}

  resolveGeoData(): Observable<ResolvedGeoData> {
    return of(this.localStotageService.getItem(STORAGEKEYS.USER_GEO)).pipe(
      concatMap((resolvedData: ResolvedGeoData | null) => {
        return iif(
          () => null != resolvedData,
          defer(() => of(resolvedData as ResolvedGeoData)),
          defer(() =>
            this.geoByIpService
              .getLocation()
              .pipe(
                tap((resolveData) =>
                  this.localStotageService.setItem(
                    STORAGEKEYS.USER_GEO,
                    resolveData
                  )
                )
              )
          )
        );
      }),
      exhaustMap((value: ResolvedGeoData) => {
        return combineLatest([
          this.currentDayForecast.getCurrentForecast(value),
          this.weatherService.fifeDaysForecastData(value),
        ]).pipe(
          map(([todayWeather, fiveDaysForecast]) => {
            this.weatherStoreService.appStateInitializer([
              value,
              fiveDaysForecast,
              todayWeather,
            ]);
            return value;
          })
        );
      })
    );
  }
}

// resolveGeoData(): Observable<ResolvedGeoData> {
//   const userGeo = this.localStorageService.getItem('userGeo');

//   return userGeo
//     ? of(userGeo) // Если данные есть, возвращаем их сразу
//     : this.geoByIpService.getLocation().pipe(
//         tap((resolvedData) => this.localStorageService.setItem('userGeo', resolvedData))
//       );
// }
