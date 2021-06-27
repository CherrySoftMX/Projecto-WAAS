import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GameDetails } from '../_models/game-details';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameDatailsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchGameDetails = (gameId: number): Promise<GameDetails> => {
    let fetchUrl = `${environment.apiUrl}/games/${gameId}`;

    const loggedUser = this.authService.currentUserValue;

    if (loggedUser) fetchUrl = `${fetchUrl}?userId=${loggedUser.userId}`;

    return this.http.get<GameDetails>(fetchUrl).toPromise();
  };
}
