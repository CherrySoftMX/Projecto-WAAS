import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/utils/public-endpoint.decorator';
import { Comment } from '../entities/comment.entity';
import { CommentRequest } from '../request/comment.request';
import { CommentService } from '../services/comment.service';

@Controller('games/:gameId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  getComments(@Param() params) {
    return this.commentService.getComments(params.gameId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createComment(
    @Param() params,
    @Req() request: Request,
    @Body() body: CommentRequest,
  ) {
    const { userId } = request.user as any;

    return this.commentService.createComment(
      userId,
      params.gameId,
      new Comment({ ...body }),
    );
  }

  @Put('/:commentId')
  @HttpCode(HttpStatus.OK)
  updateComment(@Param() params, @Body() body: CommentRequest) {
    return this.commentService.updateComment(
      params.gameId,
      params.commentId,
      new Comment({ ...body }),
    );
  }

  @Delete('/:commentId')
  @HttpCode(HttpStatus.OK)
  deleteComment(@Param() params) {
    return this.commentService.deleteComment(params.gameId, params.commentId);
  }
}
