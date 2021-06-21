import { IsNotEmpty } from 'class-validator';

export class CommentRequest {
  @IsNotEmpty({ message: 'El contenido del comentario no puede estar vacío.' })
  content: string;
}
