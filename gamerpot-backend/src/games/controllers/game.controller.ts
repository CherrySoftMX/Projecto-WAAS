import { Controller, Get } from '@nestjs/common';
import { GameService } from '../services/game.service';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  getGame() {
    return this.gameService.getGame(8);
  }
}
