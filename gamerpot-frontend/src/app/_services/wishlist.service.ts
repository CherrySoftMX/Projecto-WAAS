import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GameDetails } from '../_models/game-details';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  fetchWishlist(page?: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/games/wishlist/self?page=${page}`)
      .pipe(
        map((result) => {
          let { totalCount, wishlist } = result;

          wishlist = wishlist.map((game: any) => {
            game.id = game.gameId;
            delete game.gameId;
            return game;
          });

          return [totalCount, wishlist];
        })
      )
      .toPromise();
  }

  toggleSave(game: GameDetails) {
    return this.http
      .post<User>(`${environment.apiUrl}/games/${game.id}/toggle-save`, game)
      .toPromise()
      .then((user) => {
        game.savedBy += game.savedByLoggedUser ? -1 : 1;
        game.savedByLoggedUser = !game.savedByLoggedUser;
        return user;
      });
  }
}
