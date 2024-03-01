import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';
//import { AddTokenInterceptor } from './utils/add-token.interceptor';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //provideHttpClient(),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // Toastr providers
    //{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
    provideHttpClient(withInterceptors([addTokenInterceptor]))
  ]
};
