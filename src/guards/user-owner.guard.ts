import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.userId.toString() === req.user.id.toString()) {
      return true;
    } else {
      throw new ForbiddenException('User does not have access to this entity');
    }
  }
}
