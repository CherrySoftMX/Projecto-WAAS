import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { EmailInUseException } from '../auth/exceptions/email-in-use-exception';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const existsUser = await this.existsUser(user.email);

    if (existsUser) throw new EmailInUseException(user.email);

    user.password = await bcrypt.hash(user.password, 10);

    return this.userRepository.save(user);
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async existsUser(email: string) {
    return (await this.getByEmail(email)) != null;
  }
}
