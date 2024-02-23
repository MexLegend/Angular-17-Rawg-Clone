import { HttpClient } from '@angular/common/http';
import { Injectable, inject, WritableSignal, signal } from '@angular/core';
import { Observable, finalize, forkJoin, map, of } from 'rxjs';
import { IGame } from '@models/game.interface';
import { IGameDetails } from '../../../core/models/game-details.interface';
import { URL_GAMES } from 'core/constants/urls-api.constant';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _http = inject(HttpClient);
  public readonly $loading: WritableSignal<boolean> = signal(false);
  private readonly _favoriteGames: WritableSignal<IGame[]> = signal([]);

  getGameById(id: number): Observable<IGameDetails> {
    return this._http.get<IGameDetails>(`${URL_GAMES}/${id}`);
  }

  getFavoriteGames(ids: number[]): Observable<IGame[]> {
    this.$loading.set(true);

    if (this._favoriteGames().length) {
      this.$loading.set(false);
      return of(this._favoriteGames());
    }

    const gameObservables: Observable<IGame>[] = [];

    ids.forEach((id) => {
      const gameObservable = this._http
        .get<IGameDetails>(`${URL_GAMES}/${id}`)
        .pipe(
          map((resp) => {
            const formatedGame: IGame = {
              ...resp,
              user_game: '',
              reviews_count: 0,
              saturated_color: '',
              dominant_color: '',
              parent_platforms: [],
              genres: [],
              stores: [],
              clip: '',
              tags: [],
            };
            return formatedGame;
          })
        );
      gameObservables.push(gameObservable);
    });

    return forkJoin(gameObservables).pipe(
      finalize(() => this.$loading.set(false))
    );
  }
}
