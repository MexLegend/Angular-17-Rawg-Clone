import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  inject,
} from '@angular/core';
import { IGame } from '../../core/models/game.interface';
import { GameCardComponent } from '../game-card/game-card.component';
import { GameSearchService } from '../../core/services/common/game-search.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  private readonly _searchService = inject(GameSearchService);

  @Input({ required: true }) games: IGame[] = [];
  $loading: Signal<boolean> = this._searchService.$loading;
}
