import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { IGenre } from '@models/game.interface';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [SpinnerComponent, RouterLink],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresPageComponent {
  private readonly _genreService = inject(GenreService);

  $loading: Signal<boolean> = this._genreService.$loading;
  $genres: Signal<IGenre[]> = this._genreService.getGenresList();

}
