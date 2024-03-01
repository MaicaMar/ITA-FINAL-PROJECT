import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          const router = inject(Router);
          const errorService = inject(ErrorService);
          errorService.msjError(error);
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  };







/*import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token')
  if(token) {
    request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this._errorService.msjError(error)
          this.router.navigate(['/login'])
        }
        return throwError(() => error);
      })
    );
  }
}*/






//https://www.youtube.com/watch?v=fO86sfYpaj8
/*
En el vídeo de la línea superior se explica la nueva forma de interceptor,
pero como yo no lo domino, me limito a dejarlo aquí. El código que se está usando
es el del propio Tomás, pero así sería antes de Angular 17


import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpHandlerFn,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const addTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if(token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  return next(request);
};

  //Y esto iría en 'providers' de app.config.ts:
  //provideHttpClient(withInterceptors([addTokenInterceptor])),

*/
