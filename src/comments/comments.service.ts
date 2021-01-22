import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    private cardsService: CardsService,
  ) {}

  async addComment(cardId: string, text: string) {
    const card = await this.cardsService.getSingleCard(cardId);
    const res = await this.commentsRepository.insert({ card, text });
    return { id: res.identifiers[0].id, text };
  }

  getComments(cardId: string) {
    return this.commentsRepository.find({ where: { card: { id: cardId } } });
  }

  getSingleComment(commentId: string) {
    return this.commentsRepository.findOne(commentId);
  }

  updateComment(commentID: string, text) {
    if (text) {
      this.commentsRepository.update({ id: commentID }, { text });
    }
  }

  deleteComment(commentID: string) {
    this.commentsRepository.delete({ id: commentID });
  }
}
