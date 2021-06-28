import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterRequest } from './request/register.request';
import { Public } from './utils/public-endpoint.decorator';

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request) {
    return this.authService.login(new User({ ...request.user }));
  }

  /**
   * Crea y guarda (en caso de no existir) a un usuario.
   *
   * @param registerRequest Los datos del nuevo usuario.
   *
   * @returns El id y los datos del nuevo usuario.
   *
   */
  @Post('/register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerRequest: RegisterRequest) {
    const result = await this.userService.createUser(
      new User({ ...registerRequest }),
    );

    return new User({ ...result });
  }

  /**
   * Retorna la información del usuario que está "loggeado".
   */
  @Get('/self')
  @HttpCode(HttpStatus.ACCEPTED)
  async self(@Req() res: Request) {
    const { userId } = res.user as any;

    const { password, wishlist, ...user } = await this.userService.getUserById(
      userId,
    );

    return user;
  }
}
