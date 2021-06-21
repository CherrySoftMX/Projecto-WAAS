import { Exclude } from 'class-transformer';
import { Comment } from 'src/games/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  @Exclude({ toPlainOnly: true })
  role: UserRole;

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
