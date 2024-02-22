import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GenreService } from '@routes/games-page/services/genre.service';
import { IGenre } from '@models/game.interface';

@Component({
  selector: 'app-aside-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside-bar.component.html',
  styleUrl: './aside-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideBarComponent {
  private readonly _genreService = inject(GenreService);
  $genres: Signal<IGenre[]> = this._genreService.getGenresList();
}
