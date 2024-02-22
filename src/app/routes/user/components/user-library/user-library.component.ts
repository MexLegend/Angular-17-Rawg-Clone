import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { IGame } from '@models/game.interface';
import { GameListComponent } from '../../../../shared/game-list/game-list.component';
import { UserService } from '@coreServices/common/user.service';

@Component({
  selector: 'app-user-library',
  standalone: true,
  imports: [GameListComponent],
  template: `<app-game-list [games]="$games()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLibraryComponent {
  private readonly _userService = inject(UserService);

  $games: Signal<IGame[]> = computed(() => {
    const userData = this._userService.getUserData();
    const favoriteGames = userData()?.favoriteGames.values() ?? [];
    return Array.from(favoriteGames);
  });
}
