import { FormControl } from '@angular/forms';
import { IGame } from './game.interface';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
}

export interface ILoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface IUser {
  email: string;
  name: string;
  favoriteGames: number[];
}
