export interface IGenresResult {
  count: number;
  next: string;
  previous: string;
  results: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
