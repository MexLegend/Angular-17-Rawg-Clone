import { Routes } from '@angular/router';
import { GAME_LIST_ROUTES } from './routes/games-page/game-list.routes';
import { loggedGuard } from './core/guards/logged.guard';
import { USER_ROUTES } from './routes/user/user.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () => GAME_LIST_ROUTES,
      },
      {
        path: 'user',
        canActivate: [loggedGuard],
        loadChildren: () => USER_ROUTES,
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./routes/auth/auth.routes').then((r) => r.AUTH_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
