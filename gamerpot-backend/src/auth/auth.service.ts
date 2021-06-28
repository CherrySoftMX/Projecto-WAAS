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

  /**
   * Valida un usuario ya se ha registrado previamente.
   *
   * @returns Los datos del usuario que corresponde con las credenciales @param{email} y @param{pass}
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(pass, user.password);

    if (!isValidPassword) throw new InvalidPasswordException();

    const { password, ...result } = user;

    return result;
  }

  /**
   *
   * @param user El usuario a serializar para el JWT.
   *
   * @returns Un objeto que contiene la información del usuario y el JWT.
   */
  async login(user: User) {
    const { userId, name, email, profilePictureUrl, role } = user;

    return {
      userId,
      name,
      email,
      role,
      profilePictureUrl,
      token: this.jwtService.sign({ userId, name, email }),
    };
  }
}
