import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from './game.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne((type) => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne((type) => Game, (game) => game.comments)
  game: Game;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
