import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { CardEntity } from '../cards/cards.entity';

@Injectable()
export class CommentsService {
  async addComment(cardId: string, text: string) {
    const card = await CardEntity.findOne(cardId);
    if (card === undefined) {
      return false;
    }

    CommentEntity.insert({ card, text });
    return 'success';
  }

  getComments(cardId: string) {
    return CommentEntity.find({ where: { card: { id: cardId } } });
  }

  getSingleComment(commentId: string) {
    return CommentEntity.findOne(commentId);
  }

  updateComment(commentID: string, text) {
    if (text) {
      CommentEntity.update({ id: +commentID }, { text });
    }
  }

  deleteComment(commentID: string) {
    CommentEntity.delete({ id: +commentID });
  }
}
