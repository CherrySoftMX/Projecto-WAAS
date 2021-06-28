import { IsNotEmpty, MaxLength } from 'class-validator';

export class CommentRequest {
  @IsNotEmpty({ message: 'El contenido del comentario no puede estar vacío.' })
  @MaxLength(150, {
    message:
      'El contenido del comentario debe tener un máximo de 150 caracteres.',
  })
  content: string;
}
