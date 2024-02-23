import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { IGame } from '@models/game.interface';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { UserService } from '@coreServices/common/user.service';
import { AsyncPipe } from '@angular/common';
import { GameService } from '@routes/games-page/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [GameListComponent, AsyncPipe],
  template: `<app-game-list [games]="(games$ | async)!" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLibraryComponent {
  private readonly _userService = inject(UserService);
  private readonly _gameService = inject(GameService);

  games$!: Observable<IGame[]>;

  ngOnInit(): void {
    const userData = this._userService.getUserData();
    const favoriteGames = userData()?.favoriteGames ?? [];

    this.games$ = this._gameService.getFavoriteGames(favoriteGames as number[]);
  }
}
