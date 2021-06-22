import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseException extends HttpException {
  constructor(email: string) {
    super(`El email: ${email} está en uso`, HttpStatus.BAD_REQUEST);
  }
}
