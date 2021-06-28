export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  count: number;
  next: string;
  previous: string;
  results: Genre[];
}
