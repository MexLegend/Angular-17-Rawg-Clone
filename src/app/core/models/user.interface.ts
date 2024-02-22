import { IGame } from "./game.interface";

export interface IUser {
  email: string;
  name: string;
  favoriteGames: Map<number, IGame>;
}
