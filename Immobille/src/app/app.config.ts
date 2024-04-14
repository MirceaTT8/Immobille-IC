import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import routeConfig from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), importProvidersFrom(HttpClientModule)],
};
