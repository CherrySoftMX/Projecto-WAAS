import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { API_KEY, API_URL } from 'src/shared/apis/rawg-api';
import { UserService } from 'src/user/services/user.service';
import { Game } from '../entities/game.entity';
import { GameDetails } from '../models/game-details';
import { GameResponse } from '../models/game-response';
import { GameRepository } from '../repositories/game.repository';

const DEFAULT_URL = `${API_URL}games?key=${API_KEY}`;

@Injectable()
export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  /**
   * Retorna la página de juegos especificada en la query.
   *
   * @param query El query que se usará para la petición a la API RAWG.
   * @returns La lista de juegos que con el campo "savedBy" mapeado.
   */
  async fetchGames(userId: number, query: string) {
    return await this.httpService
      .get<GameResponse>(`${DEFAULT_URL}&${query}`)
      .pipe(
        map(async (result) => {
          const { data: page } = result;

          page.results = await this.gameRepository.addSavedByProperty(
            userId,
            'id',
            page.results,
          );

          return page;
        }),
      )
      .toPromise();
  }

  async fetchGame(userId: number, gameId: number, query: string) {
    return await this.httpService
      .get<GameDetails>(`${API_URL}games/${gameId}?key=${API_KEY}&${query}`)
      .pipe(
        map(async (result) => {
          const { data: game } = result;

          return (
            await this.gameRepository.addSavedByProperty(userId, 'id', [game])
          )[0];
        }),
      )
      .toPromise();
  }

  /**
   *
   * @returns La wishlist de un usuario. La lista contiene el atributo "savedBy".
   *
   * @see {@link getSavedBy}
   */
  async getUserWishlist(userId: number, page: number, pageSize: number) {
    return await this.gameRepository.getWishlist(userId, page, pageSize);
  }

  async getGame(gameId: number) {
    return await this.gameRepository.findOne({ gameId });
  }

  async getOrCreateGame(gameId: number) {
    let game = await this.getGame(gameId);

    if (!game) game = await this.saveGame(new Game({ gameId }));

    return game;
  }

  async saveGame(game: Game) {
    return await this.gameRepository.save(game);
  }

  async updateGame(gameId: number, newGame: Game) {
    const game = await this.getOrCreateGame(gameId);

    game.name = newGame.name;
    game.released = newGame.released;
    game.metacritic = newGame.metacritic || -1;
    game.background_image = newGame.background_image || '';

    return await this.saveGame(game);
  }

  /**
   * Si el juego no se encuentra añadido al wishlist, lo añade;
   * en caso contrario, elimina el juego del wishlist.
   *
   * @returns El usuario que ha solicitado esta operación.
   */
  async toggleGameFromWishlist(userId: number, body: Game) {
    const user = await this.userService.getUserById(userId);
    const game = await this.updateGame(body.gameId, body);

    if (this.existsInWishlist(game, user.wishlist)) {
      user.wishlist = this.filterGameFromWishlist(game, user.wishlist);
    } else {
      user.wishlist.push(game);
    }

    return this.userService.saveUser(user);
  }

  filterGameFromWishlist(game: Game, wishlist: Game[]) {
    return wishlist.filter((g) => g.gameId !== game.gameId);
  }

  async existsGame(gameId: number) {
    return (await this.gameRepository.findOne({ gameId })) != null;
  }

  existsInWishlist(game: Game, wishlist: Game[]) {
    return wishlist.find((g) => g.gameId === game.gameId) != null;
  }
}
