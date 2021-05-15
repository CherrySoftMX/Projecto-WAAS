import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameDealInterface } from '../interfaces/game-deal';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  private apiUrl = 'https://www.cheapshark.com/api/1.0/deals';
  private http: HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
   }

  getDeals = async (maxResults:number = 10, page:number = 0) => {
    const params = `pageSize=${maxResults}&pageNumber=${page}`
    const url = `${this.apiUrl}?${params}`;
    let promise = new Promise<GameDealInterface>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          response => {
            resolve(response as GameDealInterface);
          },
          error => {
            reject(error);
          }
        );
      });
    return promise;
  }

}
