import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, Signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGame } from '@models/game.interface';
import { IUser } from '@models/user.interface';
import { UserService } from '@coreServices/common/user.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input({ required: true }) game!: IGame;

  private readonly _userService = inject(UserService);

  $user: Signal<IUser | null> = this._userService.getUserData();
  $favorite: Signal<boolean> = computed(() => {
    const userData = this._userService.getUserData();
    const favoriteGames = userData()?.favoriteGames ?? [];

    return favoriteGames.includes(this.game.id);
  });

  tooggleFavorite(): void {
    this._userService.toogleGame(this.game);
  }
}
