import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { GenreService } from '@routes/games-page/services/genre.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AsideBarComponent, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  private readonly _genreService = inject(GenreService);

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this._genreService.getGenres().pipe(take(1)).subscribe();
  }
}
