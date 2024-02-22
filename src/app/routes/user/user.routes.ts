import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent
      ),
    children: [
      {
        path: 'library',
        loadComponent: () =>
          import('./components/user-library/user-library.component').then(
            (c) => c.UserLibraryComponent
          ),
      },
      {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full',
      },
    ],
  },
];
