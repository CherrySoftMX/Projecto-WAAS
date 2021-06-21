import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async getGame(gameId: number) {
    return await this.gameRepository.findOne({ id: gameId });
  }

  async createGame(game: Game) {
    return await this.gameRepository.save(game);
  }

  async existsGame(gameId: number) {
    return (await this.gameRepository.findOne({ id: gameId })) != null;
  }
}
