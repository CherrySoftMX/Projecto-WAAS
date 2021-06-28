import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'games' })
export class Game {
  @PrimaryColumn()
  gameId: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  released: string;

  @Column({ default: -1 })
  metacritic: number;

  @Column({ default: '' })
  background_image: string;

  @OneToMany((type) => Comment, (comment) => comment.game, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToMany((type) => User, (user) => user.wishlist)
  savedBy: User[];

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
