import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/cards.entity';
import { Repository } from 'typeorm';
import * as isUUID from 'is-uuid';

@Injectable()
export class CardNotExistsGuard implements CanActivate {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.cardsRepository.findOne({
      id: req.params.cardId,
    });

    if (!user) {
      throw new ForbiddenException('Card with this id not exists');
    }
    return true;
  }
}

@Injectable()
export class CardOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (req.params.cardId && isUUID.v4(req.params.cardId)) {
      const card = await this.cardsRepository.findOne(req.params.cardId, {
        relations: ['column'],
      });
      if (card.column.id.toString() === req.params.columnId.toString()) {
        return true;
      } else {
        throw new ForbiddenException('Column does not have permission');
      }
    } else {
      throw new ForbiddenException('Invalid card id type');
    }
  }
}
