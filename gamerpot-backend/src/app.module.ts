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
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { GamesModule } from './games/games.module';
import { LoggerMiddleware } from './loger.middleware';
import { UserRole } from './user/user-role';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    GamesModule,
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
      .catch((e) => {});
  }
}
