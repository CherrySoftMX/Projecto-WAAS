import { IsNotEmpty } from 'class-validator';

export class EmailRequest {
  @IsNotEmpty({ message: '¿A quién le vamos a mandar el correo?' })
  to: string;

  @IsNotEmpty({ message: 'Se necesita el body del correo' })
  body: string;
}
