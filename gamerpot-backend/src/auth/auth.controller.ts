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
import { UserRole } from 'src/user/user-role';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterRequest } from './request/register.request';
import { Roles } from './roles/role.decorator';
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

  @Get('/test')
  @Roles(UserRole.ADMIN)
  async something(@Req() res: Request) {
    console.log(res.user);
  }
}
