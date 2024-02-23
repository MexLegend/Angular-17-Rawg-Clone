import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';

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
        loadChildren: () =>
          import('./routes/games-page/game-list.routes').then(
            (r) => r.GAME_LIST_ROUTES
          ),
      },
      {
        path: 'user',
        canActivate: [loggedGuard],
        loadChildren: () =>
          import('./routes/user/user.routes').then((r) => r.USER_ROUTES),
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
