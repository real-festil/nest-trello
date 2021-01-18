import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.usersRepository.findOne({ email: req.body.email });

    console.log(req.body, await this.usersRepository.find());

    if (user) {
      throw new ForbiddenException('User with this email already exists');
    }
    return true;
  }
}
