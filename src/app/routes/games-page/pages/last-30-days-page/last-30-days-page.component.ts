import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AutoDestroyService } from '@coreServices/utils/auto-destroy.service';
import { GameListComponent } from '@shared/game-list/game-list.component';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { AbstractGamesPageComponent } from '@shared/abstract-games-page/abstract-games-page.component';
import { IAbstractGamesPageParams } from '@models/abstract-games-page-params.interface';
import { ISearchFilters } from '@models/search-filters.interface';

@Component({
  selector: 'app-last-30-days-page',
  standalone: true,
  providers: [AutoDestroyService, DatePipe],
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
  templateUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.html',
})
export class Last30DaysPageComponent extends AbstractGamesPageComponent {
  private readonly _datePipe = inject(DatePipe);

  override defaultSearchFilters: ISearchFilters = {
    ...this.defaultSearchFilters,
    ordering: '-relevance',
    updated: `${this._datePipe.transform(
      new Date(new Date().setDate(new Date().getDate() - 30)),
      'yyyy-MM-dd'
    )},${this._datePipe.transform(new Date(), 'yyyy-MM-dd')}`,
  };

  override componentParams: IAbstractGamesPageParams = {
    ...this.componentParams,
    title: 'Last 30 days',
  };

  constructor() {
    super();
  }
}
