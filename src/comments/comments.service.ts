import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { CardEntity } from '../cards/cards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {}

  async addComment(cardId: string, text: string) {
    const card = await this.cardsRepository.findOne(cardId);
    if (card === undefined) {
      return false;
    }

    this.commentsRepository.insert({ card, text });
    return 'success';
  }

  getComments(cardId: string) {
    return this.commentsRepository.find({ where: { card: { id: cardId } } });
  }

  getSingleComment(commentId: string) {
    return this.commentsRepository.findOne(commentId);
  }

  updateComment(commentID: string, text) {
    if (text) {
      this.commentsRepository.update({ id: +commentID }, { text });
    }
  }

  deleteComment(commentID: string) {
    this.commentsRepository.delete({ id: +commentID });
  }
}
