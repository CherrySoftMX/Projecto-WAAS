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
      `${API_URL}games?key=${API_KEY}` +
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

  getBestGamesByPlataform = (
    metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12,
    page: number = 1,
    plataform: number
  ) => {
      const url = `${API_URL}games?key=${API_KEY}&platforms=${plataform}&page=${page}&metacritic=${metacriticLow},${metacriticHigh}&page_size=${pageSize}`;
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

  getBestGamesByGenre =(metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12,
    page: number = 1,
    genre: string)=>{

         const url = `${API_URL}games?key=${API_KEY}&genres=${genre}&page=${page}&metacritic=${metacriticLow},${metacriticHigh}&page_size=${pageSize}`;
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

  }

  getBestGamesByGenreAndPlatform = (metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12,
    page: number = 1,
    genre: string,
    platform:number

  )=>{
   const url = `${API_URL}games?key=${API_KEY}&genres=${genre}&platforms=${platform}&page=${page}&metacritic=${metacriticLow},${metacriticHigh}&page_size=${pageSize}`;
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

  }

  getBestGamesOrderBy = (
    ordering: string,
    page: number = 1,
    metacriticLow: number = 70,
    metacriticHigh: number = 100,
    pageSize: number = 12
  ) => {
    const url = `${API_URL}games?key=${API_KEY}&ordering=${ordering}&page=${page}&metacritic=${metacriticLow},${metacriticHigh}&page_size=${pageSize}`;
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
