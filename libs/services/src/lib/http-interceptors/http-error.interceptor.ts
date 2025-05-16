import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('HTTPErrorInterceptor');
  const _snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('%c INTERCEPTOR ON ERROR', 'color:red', error);
      const errorMessage: string =
        error.status === 404
          ? 'SOURCE FOR REQUESTED PARAMS NOT FOUND'
          : error.message;
      _snackBar.open(`${error.status}\n ${errorMessage}`, 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return throwError(() => error);
    })
  );
}
