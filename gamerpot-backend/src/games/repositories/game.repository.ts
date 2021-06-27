import { Game } from 'src/games/entities/game.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  /**
   *
   * @returns Retorna cuántas veces ha sido añadido al wishlist el juego asociado con el @arg(gameId)
   */
  async getSavedBy(gameId: number) {
    const game = await this.createQueryBuilder('game')
      .leftJoinAndSelect('game.savedBy', 'user')
      .where('game.gameId = :gameId', { gameId })
      .getOne();

    return game ? game.savedBy : [];
  }

  async getWishlist(userId: number, page = 1, pageSize = 12) {
    if (page <= 0 || Number.isNaN(page)) page = 1;
    if (pageSize <= 0 || Number.isNaN(pageSize)) pageSize = 12;

    let [wishlist, totalCount] = await this.createQueryBuilder('wishlist')
      .leftJoinAndSelect('wishlist.savedBy', 'user')
      .where('user.userId = :userId', { userId })
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getManyAndCount();

    wishlist.forEach((game) => delete game.savedBy);

    wishlist = await this.addSavedByProperty(userId, 'gameId', wishlist);

    return { wishlist, totalCount };
  }

  /**
   * Añade la @property {savedBy} a la lista de objetos pasados por parámetro.
   *
   * @see {getSavedBy}
   */
  async addSavedByProperty(userId: number, idProperty: string, items: any[]) {
    return await Promise.all(
      items.map(async (item) => {
        const savedBy = await this.getSavedBy(item[idProperty]);
        item.savedByLoggedUser = savedBy.some((user) => user.userId == userId);
        item.savedBy = savedBy.length;
        return item;
      }),
    );
  }
}
