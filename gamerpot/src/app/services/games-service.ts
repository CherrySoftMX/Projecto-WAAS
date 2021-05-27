import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponse } from '../interfaces/game-response';
import { API_KEY, API_URL } from '../shared/api';

interface UrlParams {
  page: number;
  pageSize: number;
  platform: number | null;
  order: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  readonly DEFAULT_URL: string = `${API_URL}games?key=${API_KEY}`;
  url: string = this.DEFAULT_URL;

  constructor(private http: HttpClient) {}

  buildUrl = ({
    page = 1,
    pageSize = 12,
    platform,
    order,
  }: Partial<UrlParams>) => {
    this.url = this.DEFAULT_URL;

    this.url += `&page=${page}` + `&page_size=${pageSize}`;

    if (platform && order) {
      this.url += `&ordering=-${order}&platforms=${platform}`;
    } else if (platform) {
      this.url += `&platforms=${platform}`;
    } else if (order) {
      this.url += `&ordering=${order}`;
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
