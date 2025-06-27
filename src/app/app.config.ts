import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import {registerLocaleData} from '@angular/common'
import localEs from '@angular/common/locales/es'
import { authInterceptor } from './core/interceptors/auth.interceptor';

registerLocaleData(localEs, 'es')

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withFetch(), 
      withInterceptors([authInterceptor])),
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }      
  ]
};
