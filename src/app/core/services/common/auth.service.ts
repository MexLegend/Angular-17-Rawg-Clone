import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable, delay, finalize, of, tap } from 'rxjs';
import { ILoginData, IUser } from '../../models/user.interface';

import { KEY_STORAGE } from '../../models/storage.enum';
import { LocalStorageService } from './storage/local-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _storageService = inject(LocalStorageService);
  private readonly _userService = inject(UserService);

  public $loading: WritableSignal<boolean> = signal(false);

  login(loginData: ILoginData): Observable<IUser> {
    this.$loading.set(true);

    const user: IUser = {
      name: 'PrograMarc',
      email: loginData.email,
      favoriteGames: [],
    };

    return of(user).pipe(
      delay(1000),
      finalize(() => {
        this.$loading.set(false)
      })
    );
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      this._storageService.removeItem(KEY_STORAGE.DATA_USER);
      this._userService.setUserData(null);
      observer.next();
      observer.complete();
    });
  }
}
