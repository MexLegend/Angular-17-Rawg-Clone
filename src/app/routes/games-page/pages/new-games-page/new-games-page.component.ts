import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IAbstractGamesPageParams } from '@models/abstract-games-page-params.interface';
import { ISearchFilters } from '@models/search-filters.interface';
import { AutoDestroyService } from '@coreServices/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from '@shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from '@shared/game-list/game-list.component';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-new-games-page',
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GameListComponent,
    SpinnerComponent,
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  templateUrl:  '../../../../shared/abstract-games-page/abstract-games-page.component.html',
})
export class NewGamesPageComponent extends AbstractGamesPageComponent {
  override defaultSearchFilters: ISearchFilters = {
    ...this.defaultSearchFilters,
    ordering: '-released',
    metacritic: '80,100',
  };

  override componentParams: IAbstractGamesPageParams = {
    title: 'New and trending',
    subtitle: 'Based on player counts and release date',
    showFilters: true,
  };

  constructor() {
    super();
  }
}
