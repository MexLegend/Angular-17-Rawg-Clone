import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable, delay, finalize, of, tap } from 'rxjs';
import { User } from '../../models/user.class';
import { StorageService } from './storage.service';
import { KEY_STORAGE } from '../../models/storage.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _storageService = inject(StorageService);

  $loading: WritableSignal<boolean> = signal(false);
  $user: WritableSignal<User | null> = signal(null);

  login({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember: boolean;
  }): Observable<User> {
    this.$loading.set(true);
    const user: User = new User({
      name: 'PrograMarc',
      email: 'programarcdev@gmail.com',
      storageService: this._storageService,
    });
    return of(user).pipe(
      delay(1000),
      tap((user: User) => this.$user.set(user)),
      finalize(() => this.$loading.set(false))
    );
  }
  logout(): Observable<void> {
    return new Observable((observer) => {
      this.$user.set(null);
      this._storageService.remove(KEY_STORAGE.DATA_USER);
      observer.next();
      observer.complete();
    });
  }

  getUserFromStorage(): Observable<void> {
    return new Observable((observer) => {
      const user: User | null = this._storageService.get(KEY_STORAGE.DATA_USER)
        ? new User({
            ...JSON.parse(this._storageService.get(KEY_STORAGE.DATA_USER)),
            storageService: this._storageService,
          })
        : null;
      this.$user.set(user);
      observer.next();
      observer.complete();
    });
  }
}
