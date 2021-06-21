import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity({ name: 'games' })
export class Game {
  @PrimaryColumn()
  id: number;

  @OneToMany((type) => Comment, (comment) => comment.game, {
    cascade: true,
  })
  comments: Comment[];

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
