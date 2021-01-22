import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const res = await this.usersRepository.save({
      username,
      email,
      password: hashedPassword,
    });
    return res;
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getSingleUser(userId: string) {
    return await this.usersRepository.findOne(userId);
  }

  async updateUser(userId: string, userData: UpdateUserDto) {
    const user = await this.usersRepository.findOne(userId);
    return await this.usersRepository.save({
      ...user,
      ...userData,
    });
  }

  async deleteUser(userId: string) {
    this.usersRepository.delete({ id: userId });
    return userId;
  }
}
