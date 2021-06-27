import { IsNotEmpty } from 'class-validator';

export class SaveGameRequest {
  @IsNotEmpty({
    message: 'Pasa el título del del juego que estás guardando.',
  })
  name: string;

  @IsNotEmpty({ message: 'Pasa la fecha del juego.' })
  released: string;

  metacritic = -1;

  background_image = '';
}
