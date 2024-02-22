import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, finalize, map, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IGenre } from '../../../core/models/game.interface';
import { IGenresResult } from '../../../core/models/genre.interface';

@Injectable({ providedIn: 'root' })
export class GenreService {
  public $genres: WritableSignal<IGenre[]> = signal([]);
  public $loading: WritableSignal<boolean> = signal(false);
  constructor(private httpClient: HttpClient) {}
  getGenres(): Observable<IGenre[]> {
    this.$loading.set(true);
    if (this.$genres().length > 0) {
      this.$loading.set(false);
      return of(this.$genres());
    }
    return this.httpClient
      .get<IGenresResult>(`${environment.RAWG_API_KEY}genres`)
      .pipe(
        tap((result) => this.$genres.set(result.results)),
        map((result) => result.results),
        finalize(() => this.$loading.set(false))
      );
  }
}
