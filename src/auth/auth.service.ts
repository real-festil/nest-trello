import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
