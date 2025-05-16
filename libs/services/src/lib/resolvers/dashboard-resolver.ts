import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ResolvedGeoData, ResolverService } from '@lib-services';
import { tap } from 'rxjs/operators';

export const dashBoardResolver: ResolveFn<ResolvedGeoData> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ResolverService).resolveGeoData();
};
