import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDetails } from '../interfaces/game-details';
import { API_KEY, API_URL } from '../shared/apis/rawg-api';

@Injectable({
  providedIn: 'root',
})
export class GameDatailsService {
  constructor(private http: HttpClient) {}

  fetchGameDetails = (id: number): Promise<GameDetails> => {
    const url = `${API_URL}games/${id}?key=${API_KEY}`;
    return this.http.get<GameDetails>(url).toPromise();
  };
}
