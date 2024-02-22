import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable, Subject, finalize, tap } from 'rxjs';
import { ISearchResult } from '../../models/game.interface';
import { ISearchFilters } from '../../models/search-filters.interface';
import { URL_GAMES } from 'core/constants/urls-api.constant';

@Injectable({
  providedIn: 'root',
})
export class GameSearchService {
  private readonly _http = inject(HttpClient);

  public $loading: WritableSignal<boolean> = signal(false);
  private queryString: Subject<string> = new Subject<string>();
  public queryString$ = this.queryString.asObservable();
  public nextUrl: string = '';

  searchGames(filters: ISearchFilters): Observable<ISearchResult> {
    this.$loading.set(true);

    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });

    if (!filters.genres) params = params.delete('genres');

    return this._http.get<ISearchResult>(URL_GAMES, { params }).pipe(
      tap((result) => (this.nextUrl = result.next)),
      finalize(() => this.$loading.set(false))
    );
  }

  nextPage(): Observable<ISearchResult> {
    this.$loading.set(true);

    return this._http.get<ISearchResult>(this.nextUrl).pipe(
      tap((result) => (this.nextUrl = result.next)),
      finalize(() => this.$loading.set(false))
    );
  }

  setQueryString(queryString: string): void {
    this.queryString.next(queryString);
  }
}
