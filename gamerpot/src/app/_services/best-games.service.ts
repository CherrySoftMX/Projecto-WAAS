import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_KEY } from '../shared/apis/rawg-api';
import { GameResponse } from '../_models/game-response';
import { AuthService } from './auth.service';
import { UrlBuilder } from './utils/url-builder';

interface UrlParams {
  [key: string]: any;

  metacritic: number[];
  page: number;
  page_size: number;
  platforms?: number;
  genres?: number;
  ordering?: string;
  search?: string;
  search_precise?: boolean;
  userId?: number;
}

const DEFAULT_URL_PARAMS: UrlParams = {
  metacritic: [70, 100],
  page: 1,
  page_size: 12,
};

const DEFAULT_URL = `${environment.apiUrl}/games?key=${API_KEY}`;

@Injectable({
  providedIn: 'root',
})
export class BestGamesService extends UrlBuilder<UrlParams> {
  constructor(private http: HttpClient, private authService: AuthService) {
    super(DEFAULT_URL, DEFAULT_URL_PARAMS);
  }

  fetchGames = (url?: string): Promise<GameResponse> => {
    let fetchUrl = url || this.url;
    const loggedUser = this.authService.currentUserValue;

    if (loggedUser) fetchUrl = `${fetchUrl}&userId=${loggedUser.userId}`;

    return this.http.get<GameResponse>(fetchUrl).toPromise();
  };
}
