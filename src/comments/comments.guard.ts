import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../comments/comments.entity';
import * as isUUID from 'is-uuid';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.commentId && isUUID.v4(req.params.commentId)) {
      const comment = await this.commentsRepository.findOne(
        req.params.commentId,
        {
          relations: ['card'],
        },
      );
      if (comment.card.id.toString() === req.params.cardId.toString()) {
        return true;
      } else {
        throw new ForbiddenException('Card does not have permission');
      }
    } else {
      throw new ForbiddenException('Invalid comment id type');
    }
  }
}
