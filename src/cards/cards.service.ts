import { Injectable } from '@nestjs/common';
import { CardEntity } from './cards.entity';
import { ColumnEntity } from '../columns/columns.entity';

@Injectable()
export class CardsService {
  async addCard(columnId: string, name: string, description?: string) {
    const column = await ColumnEntity.findOne(columnId);
    if (column === undefined) {
      return false;
    }

    CardEntity.insert({ column, name, description });
    return 'success';
  }

  getCards(columnId: string) {
    return CardEntity.find({ where: { column: { id: columnId } } });
  }

  getSingleCard(cardId: string) {
    return CardEntity.findOne(cardId);
  }

  updateCard(cardId: string, name?: string, description?: string) {
    if (name) {
      CardEntity.update({ id: +cardId }, { name });
    }
    if (description) {
      CardEntity.update({ id: +cardId }, { description });
    }
  }

  deleteCard(cardId: string) {
    CardEntity.delete({ id: +cardId });
  }
}
