import { Routes } from '@angular/router';
import { gameIdResolver } from '../../core/resolvers/game-id.resolver';

export const GAME_LIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/new-games-page/new-games-page.component').then(
        (c) => c.NewGamesPageComponent
      ),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./pages/games-page/game-page.component').then(
        (c) => c.GamesPageComponent
      ),
  },
  {
    path: 'games/:id',
    loadComponent: () =>
      import('./pages/game-detail-page/game-detail-page.component').then(
        (c) => c.GameDetailPageComponent
      ),
    resolve: {
      game: gameIdResolver,
    },
    data: {
      reuseComponent: false,
    },
  },
  {
    path: 'last-30-days',
    loadComponent: () =>
      import('./pages/last-30-days-page/last-30-days-page.component').then(
        (c) => c.Last30DaysPageComponent
      ),
  },

  {
    path: 'genres',
    loadComponent: () =>
      import('./pages/genres-page/genres-page.component').then(
        (c) => c.GenresPageComponent
      ),
  },
  {
    path: 'genres/:genre',
    loadComponent: () =>
      import('./pages/genre-page/genre-page.component').then(
        (c) => c.GenrePageComponent
      ),
    data: {
      reuseComponent: false,
    },
  },
];
