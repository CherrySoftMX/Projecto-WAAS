import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GameDetails } from '../interfaces/game-details'

@Injectable({
  providedIn: 'root'
})
export class GameDatailsService {

  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'bf2435ad67954a7abb2fa86caed830d3';

  constructor(private http: HttpClient) { }

  getGameDetails = (id: number): Promise<GameDetails> => {
    const url = `${this.apiUrl}/${id}?key=${this.apiKey}`;

    let promise = new Promise<GameDetails>((resolve, reject) => {
      this.http.get(url).toPromise().then((response) => {
        resolve(response as GameDetails);
      }, (error) => {
        reject(error);
      });
    });

    return promise;
  }
}
