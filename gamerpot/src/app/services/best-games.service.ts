import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponse } from '../interfaces/game-response';
import { API_KEY, API_URL } from '../shared/api';

interface UrlParams {
  [key: string]: any;

  metacritic: number[];
  page: number;
  page_size: number;
  platforms?: number;
  genres?: number;
  ordering?: string;
  search?: string;
}

const DEFAULT_URL_PARAMS: UrlParams = {
  metacritic: [70, 100],
  page: 1,
  page_size: 12,
};

@Injectable({
  providedIn: 'root',
})
export class BestGamesService {
  readonly DEFAULT_URL = `${API_URL}games?key=${API_KEY}`;

  url: string = this.DEFAULT_URL;

  constructor(private http: HttpClient) {}

  buildUrl = (args: Partial<UrlParams>) => {
    let ob = { ...DEFAULT_URL_PARAMS };
    this.url = this.DEFAULT_URL;

    Object.getOwnPropertyNames(args).forEach((name) => {
      ob = { ...ob, [name]: args[name] };
    });

    Object.getOwnPropertyNames(ob).forEach((property) => {
      const value = args[property] || DEFAULT_URL_PARAMS[property];

      if (value)
        this.url += `&${property}=${
          Array.isArray(value) ? value.join() : value
        }`;
    });

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
