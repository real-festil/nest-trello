import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async addUser(username: string, email: string, password: string) {
    const isExist = await User.findOne({ email });

    if (isExist) {
      return 'User already exists';
    }
    User.insert({ username, email, password });
    return 'User successfully created';
  }

  async login(user: any) {
    const fullUserData = await User.findOne({ email: user.email });
    const payload = { sub: fullUserData.id, email: fullUserData.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
