import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const res = await this.usersRepository.insert({
      username,
      email,
      password: hashedPassword,
    });
    return { id: res.identifiers[0].id, username, email };
  }

  getUsers() {
    return this.usersRepository.find();
  }

  getSingleUser(userId: string) {
    return this.usersRepository.findByIds([userId]);
  }

  updateUser(
    userId: string,
    username: string,
    email: string,
    password: string,
  ) {
    if (username) {
      this.usersRepository.update({ id: +userId }, { username });
    }
    if (email) {
      this.usersRepository.update({ id: +userId }, { email });
    }
    if (password) {
      this.usersRepository.update({ id: +userId }, { password });
    }
  }

  deleteUser(userId: string) {
    this.usersRepository.delete({ id: +userId });
  }
}
