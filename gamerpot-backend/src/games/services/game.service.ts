import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { API_KEY, API_URL } from 'src/shared/apis/rawg-api';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { GameDetails } from '../interfaces/game-details';
import { GameResponse } from '../interfaces/game-response';

const DEFAULT_URL = `${API_URL}games?key=${API_KEY}`;

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  /**
   * Retorna la página de juegos especificada en la query.
   *
   * @param query El query que se usará para la petición a la API RAWG.
   * @returns La lista de juegos que con el campo "savedBy" mapeado.
   */
  async getGames(query: string) {
    const { data: page } = await this.httpService
      .get<GameResponse>(`${DEFAULT_URL}&${query}`)
      .toPromise();

    page.results = (await this.addSavedByProperty(
      'id',
      page.results,
    )) as GameDetails[];

    return page;
  }

  /**
   *
   * @returns La wishlist de un usuario. La lista contiene el atributo "savedBy".
   *
   * @see {@link getSavedBy}
   */
  async getUserWishlist(userId: number) {
    const wishlist = await this.userService.getWishlist(userId);
    return (await this.addSavedByProperty('gameId', wishlist)) as Game[];
  }

  async getGame(gameId: number) {
    return await this.gameRepository.findOne({ gameId });
  }

  /**
   *
   * @returns Retorna cuántas veces ha sido añadido al wishlist el juego asociado con el @arg(gameId)
   */
  async getSavedBy(gameId: number) {
    const game = await this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.savedBy', 'user')
      .where('game.gameId = :gameId', { gameId })
      .getOne();

    return game ? game.savedBy : [];
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

    game.title = newGame.title;
    game.date = newGame.date;
    game.metacritic = newGame.metacritic;
    game.imageUrl = newGame.imageUrl;

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

  /**
   * Añade la @property {savedBy} a la lista de objetos pasados por parámetro.
   *
   * @see {getSavedBy}
   */
  private async addSavedByProperty(idProperty: string, items: any[]) {
    return await Promise.all(
      items.map(async (item) => {
        item.savedBy = (await this.getSavedBy(item[idProperty])).length;
        return item;
      }),
    );
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
