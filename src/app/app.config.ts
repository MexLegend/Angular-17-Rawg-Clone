import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from 'core/interceptors/api.interceptor';
import { IdRouteReuseStrategy } from '@models/id-route-reuse-strategy.class';
import { GenreService } from '@routes/games-page/services/genre.service';
import { UserService } from '@coreServices/common/user.service';
import { firstValueFrom } from 'rxjs';

function init(genresService: GenreService) {
  return () => firstValueFrom(genresService.getGenres());
}

function loadUserFromStorage(userService: UserService) {
  return () => userService.loadUserFromStorage();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([apiInterceptor])),
    {
      provide: RouteReuseStrategy,
      useClass: IdRouteReuseStrategy,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [GenreService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadUserFromStorage,
      deps: [UserService],
      multi: true,
    },
  ],
};
