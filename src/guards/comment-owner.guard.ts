import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CommentEntity } from '../comments/comments.entity';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.commentId) {
      const comment = await CommentEntity.findOne(req.params.commentId, {
        relations: ['card'],
      });
      if (comment.card.id.toString() === req.params.cardId.toString()) {
        return true;
      } else {
        throw new ForbiddenException('Card does not have permission');
      }
    }
  }
}
