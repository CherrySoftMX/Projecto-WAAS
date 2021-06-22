import { HttpException, HttpStatus } from '@nestjs/common';

export class CommentNotFoundException extends HttpException {
  constructor(commentId: number) {
    super(
      `El comentario con el id: ${commentId} no existe`,
      HttpStatus.NOT_FOUND,
    );
  }
}
