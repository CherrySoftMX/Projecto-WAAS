import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/utils/public-endpoint.decorator';
import { URLSearchParams } from 'url';
import { Game } from '../entities/game.entity';
import { SaveGameRequest } from '../request/save-game.request';
import { GameService } from '../services/game.service';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @Public()
  getGames(@Query() query) {
    const userId = query.userId;

    return this.gameService.fetchGames(
      userId,
      new URLSearchParams(query).toString(),
    );
  }

  @Get('/:gameId')
  @Public()
  getGame(@Param() params, @Query() query) {
    const userId = query.userId;

    return this.gameService.fetchGame(
      userId,
      params.gameId,
      new URLSearchParams(query).toString(),
    );
  }

  @Get('/wishlist/self')
  async getSelfWishlist(@Req() request: Request, @Query() queryParams) {
    const { userId } = request.user as any;

    return this.gameService.getUserWishlist(
      userId,
      queryParams.page,
      queryParams.pageSize,
    );
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
