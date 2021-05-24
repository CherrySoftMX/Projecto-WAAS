import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponse } from '../interfaces/game-response';
import { API_KEY, API_URL } from '../shared/api';

@Injectable({
  providedIn: 'root',
})
export class BestGamesService {
  constructor(private http: HttpClient) {}

  getBestGames = (
    metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12,
    page: number = 1
  ): Promise<GameResponse> => {
    const url =
      `${API_URL}?key=${API_KEY}` +
      `&metacritic=${metacriticLow},${metacriticHigh}` +
      `&page=${page}` +
      `&page_size=${pageSize}`;

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
