import { IsNotEmpty } from 'class-validator';
import { LoginRequest } from './login.request';

export class RegisterRequest extends LoginRequest {
  @IsNotEmpty({
    message: 'Necesitamos el nombre del usuario para registrarlo.',
  })
  name: string;
}
