import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailInUseException } from '../../auth/exceptions/email-in-use.exception';
import { UserRole } from '../entities/user-role';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user)
      throw new UserNotFoundException(
        `No existe el usuario con el email: ${email}`,
      );

    return user;
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOne({ userId });

    if (!user)
      throw new UserNotFoundException(
        `No existe el usuario con el id: ${userId}`,
      );

    return user;
  }

  async createUser(user: User) {
    const existsUser = await this.existsUser(user.email);

    if (existsUser) throw new EmailInUseException(user.email);

    user.password = await this.hashPassword(user.password);

    return this.userRepository.save(user);
  }

  async updateUser(userId: number, newUser: User) {
    const user = await this.getUserById(userId);

    user.name = newUser.name;
    user.email = newUser.email;
    user.password = await this.hashPassword(newUser.password);

    return this.userRepository.save(user);
  }

  async updateUserRole(userId: number, newRole: UserRole) {
    const user = await this.getUserById(userId);

    user.role = UserRole[newRole.toString()];

    return this.userRepository.save(user);
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

  async existsUser(email: string) {
    try {
      await this.getUserByEmail(email);
      return true;
    } catch (e) {
      return false;
    }
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
