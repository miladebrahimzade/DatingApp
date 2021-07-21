import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorIntecepter implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const appliactionError = error.headers.get('Application-Error');
                    if(appliactionError) {
                        return throwError(appliactionError);
                    }
                    const ServerError = error.error;
                    let modalStateErrors = '';
                    if (ServerError.errors && typeof ServerError.errors === 'object') {
                        for (const key in ServerError.errors) {
                            if (ServerError.errors[key]) {
                                modalStateErrors +=ServerError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || ServerError);
                }
                return throwError('Server Error');
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntecepter,
    multi: true
}