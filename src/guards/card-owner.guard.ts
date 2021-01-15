import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CardEntity } from '../cards/cards.entity';

@Injectable()
export class CardOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.cardId) {
      const card = await CardEntity.findOne(req.params.cardId, {
        relations: ['column'],
      });
      if (card.column.id.toString() === req.params.columnId.toString()) {
        return true;
      } else {
        throw new ForbiddenException('Column does not have permission');
      }
    }
  }
}
