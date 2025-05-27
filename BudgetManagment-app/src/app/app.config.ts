import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.Interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient(
      withInterceptors([
        (request, next) => {
          const token = localStorage.getItem('token');
          if (token) {
            request = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
          }
          return next(request);
        }
      ])
    )]
};
