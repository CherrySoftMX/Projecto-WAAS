import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponse } from '../interfaces/game-response';
import { API_KEY, API_URL } from '../shared/api';

interface UrlParams {
  metacriticLow: number;
  metacriticHigh: number;
  page: number;
  pageSize: number;
  platform: number | null;
  genre: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class BestGamesService {
  readonly DEFAULT_URL: string = `${API_URL}games?key=${API_KEY}`;

  url: string = this.DEFAULT_URL;

  constructor(private http: HttpClient) {}

  buildUrl = ({
    metacriticLow = 70,
    metacriticHigh = 100,
    page = 1,
    pageSize = 12,
    platform,
    genre,
  }: Partial<UrlParams>) => {
    this.url = this.DEFAULT_URL;

    this.url +=
      `&metacritic=${metacriticLow},${metacriticHigh}` +
      `&page=${page}` +
      `&page_size=${pageSize}`;

    if (platform && genre) {
      this.url += `&genres=${genre}&platforms=${platform}`;
    } else if (platform) {
      this.url += `&platforms=${platform}`;
    } else if (genre) {
      this.url += `&genres=${genre}`;
    }

    return this;
  };

  fetchGames = (url?: string): Promise<GameResponse> => {
    let fetchUrl = url ? url : this.url;

    let promise = new Promise<GameResponse>((resolve, reject) => {
      this.http
        .get(fetchUrl)
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
