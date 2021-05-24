import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDealInterface } from '../interfaces/game-deal';

interface DealsSearchParameters {
  maxResults?: number,
  page: number,
  params?: string,
  title?: string,
  lowerPrice?: number,
  upperPrice?: number
}

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private apiUrl = 'https://www.cheapshark.com/api/1.0/deals';

  constructor(private http: HttpClient) {}

  getDeals = async ({
    maxResults = 15,
    page = 0,
    title = '',
    lowerPrice = 0,
    upperPrice = 500
  }: DealsSearchParameters): Promise<GameDealInterface> => {
    const params = `pageSize=${maxResults}&pageNumber=${page}&title=${title}&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}`;
    const url = `${this.apiUrl}?${params}`;
    let promise = new Promise<GameDealInterface>((resolve, reject) => {
      this.http
        .get(url, {observe: 'response' as 'response'})
        .toPromise()
        .then(
          (response) => {
            console.log(response.body);
            resolve(response.body as GameDealInterface);
          },
          (error) => {
            reject(error);
          }
        );
    });
    return promise;
  };

  getDealsByNameGame = async (
    title: string,
    page: number = 0,
    maxResults: number = 10
  ): Promise<GameDealInterface> => {
    const params = `title=${title}&pageSize=${maxResults}&pageNumber=${page}`;
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
}
