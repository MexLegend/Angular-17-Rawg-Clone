import { Routes } from '@angular/router';
import { gameListRoutes } from './shared/game-list/game-list.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    loadChildren: () => gameListRoutes,
  },
];
