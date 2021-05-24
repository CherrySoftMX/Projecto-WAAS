import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponse } from '../interfaces/game-response';

@Injectable({
  providedIn: 'root',
})
export class BestGamesService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'bf2435ad67954a7abb2fa86caed830d3';

  constructor(private http: HttpClient) {}

  getBestGames = (
    metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12,
    page: number = 1
  ): Promise<GameResponse> => {
    const url = `${this.apiUrl}?key=${this.apiKey}&metacritic=${metacriticLow},${metacriticHigh}&page_size=${pageSize}&page=${page}`;
    let promise = new Promise<GameResponse>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (response) => {
            resolve(response as GameResponse);
          },
          (error) => {
            reject(error);
          }
        );
    });

    return promise;
  };
}
