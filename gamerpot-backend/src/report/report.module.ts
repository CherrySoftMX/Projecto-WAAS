import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [GamesModule, UserModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
