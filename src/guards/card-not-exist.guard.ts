import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from 'src/cards/cards.entity';
import { Repository } from 'typeorm';

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
