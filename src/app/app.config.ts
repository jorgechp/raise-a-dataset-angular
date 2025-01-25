import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHateoas} from "./providers/hateoas/hateoas.provider";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';
import {loggingInterceptor} from "./interceptors/logging.interceptor";
import {AuthInterceptor} from "./interceptors/auth-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([loggingInterceptor]),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHateoas(),
    provideTransloco({
      config: {
        availableLangs: [{id: 'en', label: 'English'}, {id: 'es', label: 'Spanish'}, {id: 'ca', label: 'Catalan'}],
        defaultLang: 'en',
        fallbackLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        flatten: {
          aot: !isDevMode()
        }
      },
      loader: TranslocoHttpLoader
    })]
};
