import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { IGenre } from '@models/game.interface';
import { IGenresResult } from '@models/genre.interface';
import { URL_GENRES } from 'core/constants/urls-api.constant';

@Injectable({ providedIn: 'root' })
export class GenreService {
  private readonly _http = inject(HttpClient);

  private readonly _$genres: WritableSignal<IGenre[]> = signal([]);
  public $loading: WritableSignal<boolean> = signal(false);

  getGenresList(): Signal<IGenre[]> {
    return this._$genres.asReadonly();
  }

  getGenres(): Observable<IGenre[]> {
    this.$loading.set(true);

    if (this._$genres()) {
      this.$loading.set(false);
      return of(this._$genres());
    }

    return this._http.get<IGenresResult>(URL_GENRES).pipe(
      tap((result) => this._$genres.set(result.results)),
      map((result) => result.results),
      finalize(() => this.$loading.set(false))
    );
  }
}
