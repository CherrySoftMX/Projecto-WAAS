export interface Genre {
  id: number;
  name: string;
  image_background: string;
  games: Array<{
    id: number;
    name: string;
  }>;
}

export interface GenreResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<Genre>;
}
