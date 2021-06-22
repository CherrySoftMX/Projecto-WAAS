import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './controllers/comment.controller';
import { GameController } from './controllers/game.controller';
import { Comment } from './entities/comment.entity';
import { Game } from './entities/game.entity';
import { CommentService } from './services/comment.service';
import { GameService } from './services/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Comment]), UserModule, HttpModule],
  providers: [GameService, CommentService],
  controllers: [GameController, CommentController],
  exports: [CommentService],
})
export class GamesModule {}
