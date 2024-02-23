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
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { IUser } from '@models/user.interface';
import { AuthService } from '@coreServices/common/auth.service';
import { GameSearchService } from '@coreServices/common/game-search.service';
import { AutoDestroyService } from '@coreServices/utils/auto-destroy.service';
import { UserService } from '@coreServices/common/user.service';

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
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  $user: Signal<IUser | null> = this._userService.getUserData();
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
    this._authService.logout().subscribe({
      next: () => {
        this._router.navigateByUrl('/');
      },
    });
  }
}
