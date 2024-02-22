import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable, delay, finalize, of } from 'rxjs';
import { IUser } from '../../models/user.interface';

import { KEY_STORAGE } from '../../models/storage.enum';
import { LocalStorageService } from './storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _storageService = inject(LocalStorageService);
  private readonly _router = inject(Router);

  public $loading: WritableSignal<boolean> = signal(false);

  login(userData: IUser): Observable<IUser> {
    this.$loading.set(true);
    const user: IUser = {
      name: 'PrograMarc',
      email: 'programarcdev@gmail.com',
      favoriteGames: new Map([]),
    };
    this._storageService.setItem(KEY_STORAGE.DATA_USER, user);
    return of(user).pipe(
      delay(1000),
      finalize(() => this.$loading.set(false))
    );
  }

  logout(): void {
    this._storageService.removeItem(KEY_STORAGE.DATA_USER);
    this._router.navigateByUrl('/');
  }
}
