import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IGenre } from '@models/game.interface';
import { AutoDestroyService } from '@coreServices/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from '@shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from '@shared/game-list/game-list.component';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [
    GameListComponent,
    SpinnerComponent,
    GameListComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [AutoDestroyService],
  templateUrl:
    '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenrePageComponent
  extends AbstractGamesPageComponent
  implements OnInit
{
  @Input() genre: string = '';

  private readonly _router = inject(Router);

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.setParentConfig();
    super.ngOnInit();
  }

  setParentConfig(): void {
    const genre: IGenre | undefined = this.$genres().find(
      (genre: IGenre) => genre.name.toLowerCase() === this.genre.toLowerCase()
    );

    if (!genre) {
      this._router.navigateByUrl('/games');
      return;
    }

    this.componentParams = {
      ...this.componentParams,
      title: this.genre.slice(0, 1).toUpperCase() + this.genre.slice(1),
      showFilters: false,
    };

    this.defaultSearchFilters = {
      ...this.defaultSearchFilters,
      genres: genre.id.toString(),
    };
  }
}
