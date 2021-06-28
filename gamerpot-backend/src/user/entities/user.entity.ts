import { Exclude } from 'class-transformer';
import { Comment } from 'src/games/entities/comment.entity';
import { Game } from 'src/games/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: 'assets/profile_picture.png' })
  profilePictureUrl: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  @Exclude({ toPlainOnly: true })
  role: UserRole;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Game, (game) => game.savedBy, { eager: true })
  @JoinTable()
  @Exclude({ toPlainOnly: true })
  wishlist: Game[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
