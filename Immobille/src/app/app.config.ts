import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import routeConfig from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {authInterceptor} from "./services/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), importProvidersFrom(HttpClientModule), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor]))],
};
