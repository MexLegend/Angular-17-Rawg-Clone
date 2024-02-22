import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GameService } from '../../routes/games-page/services/game.service';
import { IGameDetails } from '../models/game-details.interface';

export const gameIdResolver: ResolveFn<IGameDetails> = (route, state) => {
  const gameService = inject(GameService);

  return gameService.getGameById(route.params['id']);
};
