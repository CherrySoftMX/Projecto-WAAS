import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, AppService],
})
export class AppModule {}
