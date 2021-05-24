import { GameDetails } from './game-details';

export interface GameResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<GameDetails>;
}
