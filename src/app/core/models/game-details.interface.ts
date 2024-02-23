import { IAddedByStatus, IPlatform, IRating } from "./game.interface";

export interface IGameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: IMetacriticPlatform[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: IRating[];
  reactions: IReactions;
  added: number;
  added_by_status: IAddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: IEsrbRating;
  platforms: IPlatform[];
}

export interface IMetacriticPlatform {
  metascore: number;
  url: string;
}

export interface IReactions {}

export interface IEsrbRating {
  id: number;
  slug: string;
  name: string;
}

export interface IPlatform2 {
  id: number;
  slug: string;
  name: string;
}

export interface IRequirements {
  minimum: string;
  recommended: string;
}
