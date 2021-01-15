import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ColumnEntity } from '../columns/columns.entity';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.columnId) {
      const column = await ColumnEntity.findOne(req.params.columnId, {
        relations: ['user'],
      });
      if (column.user.id.toString() === req.params.userId.toString()) {
        return true;
      } else {
        throw new ForbiddenException('User does not have permission');
      }
    }
  }
}
