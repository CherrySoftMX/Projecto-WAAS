import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Se necesita un email para registrar al usuario.' })
  @IsEmail({}, { message: 'El formato del email no es correcto.' })
  email: string;

  @IsNotEmpty({ message: 'Se necesita una contraseña para el registro.' })
  @MinLength(8, {
    message: 'La contraseña debe contener un mímimo de 8 caracteres.',
  })
  @MaxLength(16, {
    message: 'La contraseña debe contener un máximo de 16 caracteres.',
  })
  password: string;
}
