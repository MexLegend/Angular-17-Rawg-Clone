import { WritableSignal, signal } from '@angular/core';
import { KEY_STORAGE } from '../models/storage.enum';
import { StorageService } from '../services/common/storage.service';
import { IGame } from './game.interface';

export class User {
  email: string;
  name: string;
  $favouriteGames: WritableSignal<Map<number, IGame>> = signal(new Map());
  storageService: StorageService;

  constructor({
    email,
    name,
    storageService,
    favouriteGames,
  }: {
    email: string;
    name: string;
    storageService: StorageService;
    favouriteGames?: Map<number, IGame>;
  }) {
    this.email = email;
    this.name = name;
    this.$favouriteGames.set(new Map(favouriteGames ?? []));
    this.storageService = storageService;
  }

  addGame(game: IGame) {
    if (this.$favouriteGames().has(game.id)) {
      this.$favouriteGames().delete(game.id);
      this.$favouriteGames.set(new Map(this.$favouriteGames()));
    } else {
      this.$favouriteGames().set(game.id, game);
      this.$favouriteGames.set(new Map(this.$favouriteGames()));
    }
    this.updateStorage();
  }

  updateStorage(): void {
    this.storageService.update(
      KEY_STORAGE.DATA_USER,
      JSON.stringify({
        email: this.email,
        name: this.name,
        favouriteGames: Array.from(this.$favouriteGames()),
      })
    );
  }
}
