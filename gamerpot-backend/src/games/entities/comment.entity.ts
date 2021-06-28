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

  @ManyToOne((type) => Game, (game) => game.comments, { eager: true })
  game: Game;

  @Column({ length: 200 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
