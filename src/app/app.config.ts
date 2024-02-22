import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { RouteReuseStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from 'core/interceptors/api.interceptor';
import { IdRouteReuseStrategy } from '@models/id-route-reuse-strategy.interface';
import { GenreService } from '@routes/games-page/services/genre.service';
import { UserService } from '@coreServices/common/user.service';
import { firstValueFrom } from 'rxjs';

function init(genresService: GenreService) {
  return () => firstValueFrom(genresService.getGenres());
}

function loadUserFromStorage(userService: UserService) {
  return () => userService.getUserData()();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
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
