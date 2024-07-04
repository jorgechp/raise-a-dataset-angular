import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHateoas} from "./providers/hateoas/hateoas.provider";
import {provideHttpClient} from "@angular/common/http";
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHateoas(), provideHttpClient(), provideTransloco({
      config: {
        availableLangs: [{id: 'en', label: 'English'}, {id: 'es', label: 'Spanish'}],
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
