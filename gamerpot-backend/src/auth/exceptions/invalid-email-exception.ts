import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailException extends HttpException {
  constructor(email: string) {
    super(`No tenemos registrado el email: ${email}`, HttpStatus.BAD_REQUEST);
  }
}
