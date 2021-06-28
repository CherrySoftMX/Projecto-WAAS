import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty({
    message: 'Necesitamos el nombre del usuario para registrarlo.',
  })
  @MinLength(3, { message: 'El nombre tiene un mínimo de 3 caracteres.' })
  @MaxLength(50, {
    message: 'El nombre tiene un máximo de 50 caracteres.',
  })
  name: string;

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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/, {
    message:
      'La constraseña debe tener al menos 8 caracteres, 1 letra mayúscula, 1 letra minúscula y 1 número',
  })
  password: string;
}
