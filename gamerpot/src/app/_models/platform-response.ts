export interface GamePlatform {
  id: number;
  name: string;
}

export interface PlatformResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<GamePlatform>;
}
