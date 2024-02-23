import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { LocalStorageService } from './storage/local-storage.service';
import { IGame } from '@models/game.interface';
import { KEY_STORAGE } from '@models/storage.enum';
import { IUser } from '@models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _storageService = inject(LocalStorageService);
  private readonly _$user: WritableSignal<IUser | null> = signal(null);

  setUserData(userData: IUser | null): void {
    this._$user.set(userData);
  }

  getUserData(): Signal<IUser | null> {
    return this._$user.asReadonly();
  }

  toogleGame(game: IGame) {
    const newFavoriteGames = [...this._$user()!.favoriteGames];
    const index = newFavoriteGames.indexOf(game.id);

    if (index > -1) {
      newFavoriteGames.splice(index, 1);
    } else {
      newFavoriteGames.push(game.id);
    }

    this._$user.update((value) => ({
      ...value!,
      favoriteGames: newFavoriteGames,
    }));

    this.updateStorage(this._$user()!);
  }

  loadUserFromStorage() {
    const userFromStorage = this._storageService.getItem<IUser>(
      KEY_STORAGE.DATA_USER
    );
    if (userFromStorage) {
      this._$user.set(userFromStorage);
    }

    return userFromStorage;
  }

  updateStorage(userData: IUser): void {
    this._storageService.setItem(KEY_STORAGE.DATA_USER, userData);
  }
}
