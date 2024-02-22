import { Routes } from '@angular/router';
import { unloggedGuard } from '../../core/guards/unlogged.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivate: [unloggedGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
];
