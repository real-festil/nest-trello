import { Injectable } from '@nestjs/common';
import { CardEntity } from './cards.entity';
import { ColumnEntity } from '../columns/columns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {}

  async addCard(columnId: string, name: string, description?: string) {
    const column = await this.columnsRepository.findOne(columnId);
    const res = await this.cardsRepository.insert({
      column,
      name,
      description,
    });
    return { id: res.identifiers[0].id, name, description };
  }

  getCards(columnId: string) {
    return this.cardsRepository.find({ where: { column: { id: columnId } } });
  }

  getSingleCard(cardId: string) {
    return this.cardsRepository.findOne(cardId);
  }

  updateCard(cardId: string, name?: string, description?: string) {
    if (name) {
      this.cardsRepository.update({ id: +cardId }, { name });
    }
    if (description) {
      this.cardsRepository.update({ id: +cardId }, { description });
    }
  }

  deleteCard(cardId: string) {
    this.cardsRepository.delete({ id: +cardId });
  }
}
