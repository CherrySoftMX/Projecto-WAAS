import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne((type) => Game, (game) => game.comments)
  game: Game;

  @Column()
  content: string;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
