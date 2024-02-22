export interface ISearchResult {
  count: number;
  next: string;
  previous: string;
  results: IGame[];
}

export interface IGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: IAddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: Platform[];
  parent_platforms: IParentPlatform[];
  genres: IGenre[];
  stores: IStore[];
  clip: any;
  tags: ITag[];
  esrb_rating: IEsrbRating;
  short_screenshots?: IShortScreenshot[];
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface IAddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Platform {
  platform: IPlatform2;
  released_at: string;
  requirements_en?: IRequirementsEn;
  requirements_ru: any;
}

export interface IPlatform2 {
  id: number;
  name: string;
  slug: string;
  image: any;
  year_end: any;
  year_start?: number;
  games_count: number;
  image_background: string;
}

export interface IRequirementsEn {
  minimum: string;
  recommended: string;
}

export interface IParentPlatform {
  platform: IPlatform3;
}

export interface IPlatform3 {
  id: number;
  name: string;
  slug: string;
}

export interface IGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IStore {
  id: number;
  store: IStore2;
}

export interface IStore2 {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface IEsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface IShortScreenshot {
  id: number;
  image: string;
}
