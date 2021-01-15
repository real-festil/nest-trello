import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UserService {
  getUsers() {
    return User.find();
  }

  getSingleUser(userId: string) {
    return User.findByIds([userId]);
  }

  updateUser(
    userId: string,
    username: string,
    email: string,
    password: string,
  ) {
    if (username) {
      User.update({ id: +userId }, { username });
    }
    if (email) {
      User.update({ id: +userId }, { email });
    }
    if (password) {
      User.update({ id: +userId }, { password });
    }
  }

  deleteUser(userId: string) {
    User.delete({ id: +userId });
  }
}
