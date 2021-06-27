import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentNotFoundException } from '../exceptions/comment-not-found.exception';
import { NoCommentsYetException } from '../exceptions/no-comments-yet.exception';
import { GameService } from './game.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private gameService: GameService,
  ) {}

  async getComments(gameId: number) {
    return await this.commentRepository.find({
      where: { game: { gameId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getComment(gameId: number, commentId: number) {
    const existsGame = await this.gameService.existsGame(gameId);
    if (!existsGame) throw new NoCommentsYetException(gameId);

    const comment = await this.commentRepository.findOne({ commentId });
    if (!comment) throw new CommentNotFoundException(commentId);

    return comment;
  }

  async createComment(userId: number, gameId: number, comment: Comment) {
    const game = await this.gameService.getOrCreateGame(gameId);

    const newComment = new Comment({
      user: new User({ userId }),
      game,
      ...comment,
    });

    const savedComment = await this.commentRepository.save(newComment);

    return await this.commentRepository.findOne({
      commentId: savedComment.commentId,
    });
  }

  async updateComment(gameId: number, commentId: number, newComment: Comment) {
    const comment = await this.getComment(gameId, commentId);

    comment.content = newComment.content;

    return this.commentRepository.save(comment);
  }

  async deleteComment(gameId: number, commentId: number) {
    const comment = await this.getComment(gameId, commentId);

    await this.commentRepository.delete({ commentId });

    return comment;
  }
}
