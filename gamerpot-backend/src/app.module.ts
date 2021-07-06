import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { EmailModule } from './email/email.module';
import { Comment } from './games/entities/comment.entity';
import { Game } from './games/entities/game.entity';
import { GamesModule } from './games/games.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ReportModule } from './report/report.module';
import { UserRole } from './user/entities/user-role';
import { User } from './user/entities/user.entity';
import { UserService } from './user/services/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [User, Comment, Game],
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    AuthModule,
    GamesModule,
    EmailModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  /**
   * Crea un usuario (en caso de que no exista) con privilegios de @enum{UserRole.ADMIN} cuando el server inicia.
   */
  async onApplicationBootstrap() {
    this.userService
      .createUser(
        new User({
          name: 'Carlos Chan',
          email: this.configService.get('DEFAULT_ADMIN_EMAIL'),
          password: this.configService.get('DEFAULT_ADMIN_PASSWORD'),
          role: UserRole.ADMIN,
        }),
      )
      .catch((e) => {
        console.log('');
      });
  }
}
