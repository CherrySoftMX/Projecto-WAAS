import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDetails } from '../interfaces/game-details';
import { API_KEY, API_URL } from '../shared/api';

@Injectable({
  providedIn: 'root',
})
export class GameDatailsService {
  constructor(private http: HttpClient) {}

  getGameDetails = (id: number): Promise<GameDetails> => {
    const url = `${API_URL}games/${id}?key=${API_KEY}`;

    let promise = new Promise<GameDetails>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (response) => {
            resolve(response as GameDetails);
          },
          (error) => {
            reject(error);
          }
        );
    });

    return promise;
  };
}
