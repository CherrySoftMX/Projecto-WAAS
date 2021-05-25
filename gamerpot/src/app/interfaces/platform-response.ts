export interface GamePlatform {
  id: number;
  slug: string;
  name: string;
}

export interface PlatformResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<GamePlatform>;
}
