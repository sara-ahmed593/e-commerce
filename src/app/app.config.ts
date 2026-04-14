import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { ApplicationConfig, provideBrowserGlobalErrorListeners ,importProvidersFrom} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideAnimations } from "@angular/platform-browser/animations";


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions({
      skipInitialTransition:true
    }), 
    withInMemoryScrolling({
      scrollPositionRestoration: 'top'
    })
  ), provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([ headersInterceptor,errorsInterceptor, loadingInterceptor])),
  provideToastr(),
importProvidersFrom(NgxSpinnerModule),
  provideAnimations(),
  ]
};
