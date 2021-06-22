import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/utils/public-endpoint.decorator';
import { Game } from '../entities/game.entity';
import { SaveGameRequest } from '../request/save-game.request';
import { GameService } from '../services/game.service';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @Public()
  getGames(@Query() query) {
    return this.gameService.getGames(new URLSearchParams(query).toString());
  }

  @Get('/self/wishlist')
  async getSelfWishlist(@Req() request: Request) {
    const { userId } = request.user as any;
    return this.gameService.getUserWishlist(userId);
  }

  @Post('/:gameId/toggle-save')
  saveGame(
    @Param() params,
    @Req() request: Request,
    @Body() body: SaveGameRequest,
  ) {
    const { userId } = request.user as any;

    return this.gameService.toggleGameFromWishlist(
      userId,
      new Game({ gameId: params.gameId, ...body }),
    );
  }
}
