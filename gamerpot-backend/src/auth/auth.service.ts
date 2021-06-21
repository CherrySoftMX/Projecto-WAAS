import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { InvalidEmailException } from './exceptions/invalid-email-exception';
import { InvalidPasswordException } from './exceptions/invalid-password-exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user) throw new InvalidEmailException(email);

    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (!isValidPassword) throw new InvalidPasswordException();

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    delete user.name;

    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
