export interface GamePlatform {
  id: number | null;
  name: string;
}

export interface PlatformResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<GamePlatform>;
}
