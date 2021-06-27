import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { InvalidPasswordException } from './exceptions/invalid-password.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (!isValidPassword) throw new InvalidPasswordException();

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const { userId, name, email } = user;

    return {
      userId,
      name,
      email,
      token: this.jwtService.sign({ userId, name, email }),
    };
  }
}
