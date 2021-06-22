import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity({ name: 'games' })
export class Game {
  @PrimaryColumn()
  gameId: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  metacritic: number;

  @Column()
  imageUrl: string;

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
