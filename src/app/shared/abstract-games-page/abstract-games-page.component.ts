import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  BehaviorSubject,
  Subject,
  exhaustMap,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IAbstractGamesPageParams } from '@models/abstract-games-page-params.interface';
import { IGame, IGenre, ISearchResult } from '@models/game.interface';
import {
  ISearchFilters,
  ISearchFiltersForm,
} from '@models/search-filters.interface';
import { GameSearchService } from '../../core/services/common/game-search.service';
import { AutoDestroyService } from '../../core/services/utils/auto-destroy.service';
import { GenreService } from '../../routes/games-page/services/genre.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-abstract-games-page',
  standalone: true,
  providers: [],
  imports: [
    GameListComponent,
    SpinnerComponent,
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './abstract-games-page.component.html',
  styleUrl: './abstract-games-page.component.scss',
})
export abstract class AbstractGamesPageComponent implements OnInit {
  protected readonly _gamesSearchService: GameSearchService =
    inject(GameSearchService);
  protected readonly _genreService: GenreService = inject(GenreService);
  protected readonly _destroy$: AutoDestroyService = inject(AutoDestroyService);
  private readonly _fb = inject(NonNullableFormBuilder);

  $games: WritableSignal<IGame[]> = signal([]);
  $genres: Signal<IGenre[]> = this._genreService.getGenresList();
  $loading: Signal<boolean> = this._gamesSearchService.$loading;
  filters$!: BehaviorSubject<ISearchFilters>;
  scrolled$: Subject<void> = new Subject<void>();
  form?: FormGroup<ISearchFiltersForm>;
  defaultSearchFilters: ISearchFilters = {
    search: '',
    page_size: 25,
    ordering: '-relevance',
    genres: '',
  };
  componentParams: IAbstractGamesPageParams = {
    title: 'Please provide a title',
    showFilters: true,
  };

  ngOnInit(): void {
    this.filters$ = new BehaviorSubject<ISearchFilters>({
      ...this.defaultSearchFilters,
    });
    if (this.componentParams.showFilters) {
      this.initForm();
    }
    this.subscribeToFiltersChange();
    this.subscribeToQueryChanges();
    this.subscribeToInfiniteScroll();
  }

  initForm(): void {
    this.form = this._fb.group<ISearchFiltersForm>({
      order: this._fb.control(this.defaultSearchFilters.ordering),
      genres: this._fb.control(this.defaultSearchFilters.genres),
    });
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.form!.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(
      ({ order, genres }) => {
        this.filters$.next({
          ...this.filters$.getValue(),
          genres,
          ordering: order,
        });
      }
    );
  }

  subscribeToFiltersChange(): void {
    this.filters$
      .pipe(
        tap(() => this.$games.set([])),
        switchMap((filters: ISearchFilters) =>
          this._gamesSearchService.searchGames(filters)
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((data: ISearchResult) => {
        this.$games.set(data.results);
      });
  }

  subscribeToInfiniteScroll(): void {
    this.scrolled$
      .pipe(
        exhaustMap(() => {
          return this._gamesSearchService.nextPage();
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((data: ISearchResult) =>
        this.$games.update((values: IGame[]) => {
          return [...values, ...data.results];
        })
      );
  }

  subscribeToQueryChanges(): void {
    this._gamesSearchService.queryString$
      .pipe(takeUntil(this._destroy$))
      .subscribe((query: string) => {
        this.filters$.next({
          ...this.filters$.getValue(),
          search: query,
        });
      });
  }
}
