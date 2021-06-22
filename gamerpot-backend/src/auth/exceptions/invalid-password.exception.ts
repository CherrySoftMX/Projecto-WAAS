import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPasswordException extends HttpException {
  constructor() {
    super(`La contraseña es incorrecta`, HttpStatus.BAD_REQUEST);
  }
}
