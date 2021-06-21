import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Game } from '../entities/game.entity';
import { CommentNotFoundException } from '../exceptions/comment-not-found-exception';
import { NoCommentsYetException } from '../exceptions/no-comments-yet-exception';
import { GameService } from './game.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private gameService: GameService,
  ) {}

  async getComments(gameId: number) {
    return await this.commentRepository.find({
      where: { game: { id: gameId } },
    });
  }

  async getComment(gameId: number, commentId: number) {
    const existsGame = await this.gameService.existsGame(gameId);
    if (!existsGame) throw new NoCommentsYetException(gameId);

    const comment = await this.commentRepository.findOne({ id: commentId });
    if (!comment) throw new CommentNotFoundException(commentId);

    return comment;
  }

  async createComment(userId: number, gameId: number, comment: Comment) {
    let game = await this.gameService.getGame(gameId);

    if (!game)
      game = await this.gameService.createGame(new Game({ id: gameId }));

    const newComment = new Comment({
      user: new User({ id: userId }),
      game,
      ...comment,
    });

    const savedComment = await this.commentRepository.save(newComment);

    return await this.commentRepository.findOne({ id: savedComment.id });
  }

  async updateComment(gameId: number, commentId: number, newComment: Comment) {
    const comment = await this.getComment(gameId, commentId);

    comment.content = newComment.content;

    return this.commentRepository.save(comment);
  }

  async deleteComment(gameId: number, commentId: number) {
    const comment = this.getComment(gameId, commentId);

    await this.commentRepository.delete({ id: commentId });

    return comment;
  }
}
