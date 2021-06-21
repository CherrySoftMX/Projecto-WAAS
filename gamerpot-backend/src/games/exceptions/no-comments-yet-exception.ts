import { HttpException, HttpStatus } from '@nestjs/common';

export class NoCommentsYetException extends HttpException {
  constructor(gameId: number) {
    super(
      `El juego con el id: ${gameId} aún no tiene comentarios`,
      HttpStatus.NOT_FOUND,
    );
  }
}
