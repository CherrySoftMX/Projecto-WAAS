import { IsNotEmpty } from 'class-validator';

export class SaveGameRequest {
  @IsNotEmpty({
    message: 'Pasa el título del del juego que estás guardando.',
  })
  title: string;

  @IsNotEmpty({ message: 'Pasa la fecha del juego.' })
  date: string;

  @IsNotEmpty({ message: 'Olvidaste el metacritic.' })
  metacritic: number;

  @IsNotEmpty({ message: 'No olvides la imagen del juego.' })
  imageUrl: string;
}
