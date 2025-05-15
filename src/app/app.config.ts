import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideRouterStore} from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/app.store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withFetch } from '@angular/common/http';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ 
      eventCoalescing: true,
      runCoalescing: true 
    }),
    provideRouter(
      routes,
      withInMemoryScrolling(scrollConfig),
      withViewTransitions()
    ),
    provideRouterStore(),
    provideStore(reducers),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withFetch())
  ]
};
