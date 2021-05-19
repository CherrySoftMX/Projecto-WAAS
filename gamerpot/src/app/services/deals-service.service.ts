import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDealInterface } from '../interfaces/game-deal';

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private apiUrl = 'https://www.cheapshark.com/api/1.0/deals';

  constructor(private http: HttpClient) { }

  getDeals = async (
    maxResults: number = 10,
    page: number = 0
  ): Promise<GameDealInterface> => {
    const params = `pageSize=${maxResults}&pageNumber=${page}`;
    const url = `${this.apiUrl}?${params}`;
    let promise = new Promise<GameDealInterface>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (response) => {
            resolve(response as GameDealInterface);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  };


  getDealsByNameGame = async (title: string, page: number = 0, maxResults: number = 10): Promise<GameDealInterface> => {
    const params = `title=${title}&pageSize=${maxResults}&pageNumber=${page}`;
    const url = `${this.apiUrl}?${params}`;
    let promise = new Promise<GameDealInterface>((resolve, reject) => {
      this.http.get(url).toPromise().then(
        (response) => {
          resolve(response as GameDealInterface);
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }
}
