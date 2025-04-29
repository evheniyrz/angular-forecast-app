import { Injectable } from '@angular/core';
import { GeoByIpService, ResolvedGeoData, STORAGEKEYS } from '@lib-services';
import { LocalStorageService } from 'libs/services/src/lib/api/local-storage/local-storage.service';
import { concatMap, defer, iif, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  constructor(
    private localStotageService: LocalStorageService<ResolvedGeoData>,
    private geoByIpService: GeoByIpService
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
                tap((resolvedData) =>
                  this.localStotageService.setItem(
                    STORAGEKEYS.USER_GEO,
                    resolvedData
                  )
                )
              )
          )
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
