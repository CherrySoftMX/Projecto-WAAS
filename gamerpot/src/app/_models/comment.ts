import { User } from './user';

export interface Comment {
  commentId: number;
  content: string;
  createdAt: Date;
  user: User;
}
