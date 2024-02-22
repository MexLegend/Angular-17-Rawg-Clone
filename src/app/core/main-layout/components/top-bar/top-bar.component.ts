import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Signal,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs';
import { User } from '../../../models/user.class';
import { AuthService } from '../../../services/common/auth.service';
import { GameSearchService } from '../../../services/common/game-search.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  providers: [AutoDestroyService],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @HostListener('document:keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.altKey && e.key === 'Enter') {
      this.searchInput.nativeElement.focus();
    }
  }

  private readonly _gameSearchService = inject(GameSearchService);
  private readonly _destroy$ = inject(AutoDestroyService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  $user: Signal<User | null> = this._authService.$user;
  query: string = '';
  queryChange$: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.subscribeToInputChanges();
  }
  subscribeToInputChanges() {
    this.queryChange$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((query: string) =>
        this._gameSearchService.setQueryString(query)
      );
  }
  logout(): void {
    this._authService
      .logout()
      .pipe(take(1))
      .subscribe(() => this._router.navigate(['/']));
  }
}
