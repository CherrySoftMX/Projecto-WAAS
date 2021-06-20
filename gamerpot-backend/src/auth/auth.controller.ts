import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public-endpoint.decorator';
import { LoginRequest } from './request/login.request';
import { RegisterRequest } from './request/register.request';

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @Public()
  login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(new User({ ...loginRequest }));
  }

  @Post('/register')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerRequest: RegisterRequest) {
    const result = await this.userService.createUser(
      new User({ ...registerRequest }),
    );

    return new User({ ...result });
  }
}
